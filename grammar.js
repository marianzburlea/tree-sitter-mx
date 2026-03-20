/// <reference types="tree-sitter-cli/dsl" />

module.exports = grammar({
  name: 'mx',

  extras: $ => [/\s/],

  rules: {
    document: $ => repeat($._node),

    _node: $ => choice(
      $.element,
      $.self_closing_element,
      $.expression,
      $.comment,
      $.text,
    ),

    // <div class="box" css={{ mobile: { display: 'flex' } }}>...</div>
    element: $ => seq(
      $.start_tag,
      repeat($._node),
      $.end_tag,
    ),

    start_tag: $ => seq(
      '<',
      $.tag_name,
      repeat($._attribute),
      '>',
    ),

    end_tag: $ => seq(
      '</',
      $.tag_name,
      '>',
    ),

    // <img /> <slot /> <counter-div />
    self_closing_element: $ => seq(
      '<',
      $.tag_name,
      repeat($._attribute),
      '/>',
    ),

    tag_name: $ => /[a-zA-Z][a-zA-Z0-9-]*/,

    _attribute: $ => choice(
      $.attribute,
      $.expression_attribute,
    ),

    // class="box" href="/about" required
    attribute: $ => seq(
      $.attribute_name,
      optional(seq(
        '=',
        $.quoted_attribute_value,
      )),
    ),

    // css={{ mobile: { display: 'flex' } }} on-click={handler} $title={hook.title}
    expression_attribute: $ => seq(
      $.attribute_name,
      '=',
      $.expression_value,
    ),

    attribute_name: $ => /[$a-zA-Z][a-zA-Z0-9_-]*/,

    quoted_attribute_value: $ => choice(
      seq('"', optional($.attribute_string_content_double), '"'),
      seq("'", optional($.attribute_string_content_single), "'"),
    ),

    attribute_string_content_double: $ => /[^"]*/,
    attribute_string_content_single: $ => /[^']*/,

    // {expression} — balanced braces
    expression_value: $ => seq(
      '{',
      optional($.expression_content),
      '}',
    ),

    // {expression} in text content
    expression: $ => seq(
      '{',
      optional($.expression_content),
      '}',
    ),

    // Content inside {} — handles nested braces, strings, etc.
    expression_content: $ => repeat1(choice(
      // Nested braces (objects, blocks)
      seq('{', optional($.expression_content), '}'),
      // Nested brackets (arrays)
      seq('[', optional($.bracket_content), ']'),
      // Nested parens
      seq('(', optional($.expression_content), ')'),
      // Strings
      $.string,
      // Everything else except closing brace/bracket/paren
      /[^{}\[\]()'"`]+/,
    )),

    bracket_content: $ => repeat1(choice(
      seq('[', optional($.bracket_content), ']'),
      seq('{', optional($.expression_content), '}'),
      $.string,
      /[^\[\]{}'"`]+/,
    )),

    string: $ => choice(
      seq("'", /[^']*/, "'"),
      seq('"', /[^"]*/, '"'),
      seq('`', /[^`]*/, '`'),
    ),

    // <!-- comment -->
    comment: $ => seq('<!--', $.comment_content, '-->'),
    comment_content: $ => /[^-]*(-[^-][^-]*)*/,

    // Plain text between tags
    text: $ => /[^<{]+/,
  },
})
