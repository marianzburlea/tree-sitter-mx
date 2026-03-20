; === TAGS ===

; Default tag color
(tag_name) @tag

; Control flow tags — stand out as language keywords
((tag_name) @keyword.control
  (#match? @keyword.control "^(show-me|hide-me|in-case|or-case|no-case|switch-on|case-of|fall-back|for-each|slot)$"))

; Empty fallback tags
((tag_name) @keyword.control
  (#match? @keyword.control "^empty-"))

; Component tags (hyphenated custom elements)
((tag_name) @type
  (#match? @type "^[a-z]+-.*-[a-z]+$"))

; Closing tags match opening
(end_tag (tag_name) @tag)

; === ATTRIBUTES ===

; Default attribute name
(attribute_name) @attribute

; Framework attributes — css, theme, on-*, action-*, active
((attribute_name) @keyword
  (#match? @keyword "^(css|theme|on-[a-z]+|action-[a-z]+|active)$"))

; Private props ($name) — distinct from regular attributes
((attribute_name) @constant
  (#match? @constant "^\\$"))

; Quoted attribute values
(quoted_attribute_value) @string
(attribute_string_content_double) @string
(attribute_string_content_single) @string

; === EXPRESSIONS ===

; Expression braces
(expression_value "{" @punctuation.special)
(expression_value "}" @punctuation.special)
(expression "{" @punctuation.special)
(expression "}" @punctuation.special)

; Object braces
(object "{" @punctuation.bracket)
(object "}" @punctuation.bracket)

; Array brackets
(array "[" @punctuation.bracket)
(array "]" @punctuation.bracket)

; Parens
(paren_expression "(" @punctuation.bracket)
(paren_expression ")" @punctuation.bracket)

; Property keys (mobile:, display:, theme:, gap:)
(property_key) @property

; Strings
(string) @string
(string_content) @string

; Numbers
(number) @number

; Booleans
(boolean) @constant.builtin

; $prop variables — use constant to stand out from regular identifiers
((identifier) @constant
  (#match? @constant "^\\$"))

; Dotted paths (hook.title) — treat as property access
((identifier) @variable
  (#match? @variable "\\."))

; Regular identifiers
(identifier) @variable

; Operators
(operator) @operator

; === COMMENTS ===
(comment) @comment
(comment_content) @comment

; === TEXT ===
(text) @none

; === TAG PUNCTUATION ===
(start_tag "<" @punctuation.bracket)
(start_tag ">" @punctuation.bracket)
(end_tag "</" @punctuation.bracket)
(end_tag ">" @punctuation.bracket)
(self_closing_element "<" @punctuation.bracket)
(self_closing_element "/>" @punctuation.bracket)
