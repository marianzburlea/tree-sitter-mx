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

    attribute: $ => seq(
      $.attribute_name,
      optional(seq(
        '=',
        $.quoted_attribute_value,
      )),
    ),

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
      optional($._expression_inner),
      '}',
    ),

    // {expression} in text content
    expression: $ => seq(
      '{',
      optional($._expression_inner),
      '}',
    ),

    // Fine-grained tokens inside expressions
    _expression_inner: $ => repeat1($._expression_token),

    _expression_token: $ => choice(
      $.object,
      $.array,
      $.paren_expression,
      $.string,
      $.number,
      $.boolean,
      $.property_key,
      $.identifier,
      $.operator,
    ),

    // { key: value, ... }
    object: $ => seq('{', optional($._expression_inner), '}'),

    // [1, 2, 3]
    array: $ => seq('[', optional($._expression_inner), ']'),

    // (expression)
    paren_expression: $ => seq('(', optional($._expression_inner), ')'),

    string: $ => choice(
      seq("'", optional(alias(/[^']*/, $.string_content)), "'"),
      seq('"', optional(alias(/[^"]*/, $.string_content)), '"'),
      seq('`', optional(alias(/[^`]*/, $.string_content)), '`'),
    ),

    number: $ => /\d+(\.\d+)?/,

    boolean: $ => choice('true', 'false'),

    // key: (inside objects — identifier followed by colon)
    property_key: $ => /[a-zA-Z_$][a-zA-Z0-9_$-]*:/,

    // identifiers, dotted paths (hook.title, $count)
    identifier: $ => /[$a-zA-Z_][a-zA-Z0-9_$.]*/,

    // punctuation and operators
    operator: $ => /[,=><+\-*/?!&|:]+/,

    // <!-- comment -->
    comment: $ => seq('<!--', $.comment_content, '-->'),
    comment_content: $ => /[^-]*(-[^-][^-]*)*/,

    // Plain text between tags
    text: $ => /[^<{]+/,
  },
})
