; Tags
(tag_name) @tag

; Control flow tags as keywords
((tag_name) @keyword
  (#match? @keyword "^(show-me|hide-me|in-case|or-case|no-case|switch-on|case-of|fall-back|for-each|slot)$"))

; Empty tags
((tag_name) @keyword
  (#match? @keyword "^empty-"))

; Component tags (hyphenated)
((tag_name) @type
  (#match? @type "^[a-z]+-.*-[a-z]+$"))

; Attribute names
(attribute_name) @attribute

; Special attribute names
((attribute_name) @keyword
  (#match? @keyword "^(css|theme|on-[a-z]+|action-[a-z]+|active)$"))

; Private props ($name)
((attribute_name) @variable.special
  (#match? @variable.special "^\\$"))

; Quoted attribute values
(quoted_attribute_value) @string
(attribute_string_content_double) @string
(attribute_string_content_single) @string

; Expression values — braces
(expression_value "{" @punctuation.bracket)
(expression_value "}" @punctuation.bracket)
(expression "{" @punctuation.bracket)
(expression "}" @punctuation.bracket)

; Objects
(object "{" @punctuation.bracket)
(object "}" @punctuation.bracket)

; Arrays
(array "[" @punctuation.bracket)
(array "]" @punctuation.bracket)

; Property keys (mobile:, display:, theme:)
(property_key) @property

; Strings inside expressions
(string) @string
(string_content) @string

; Numbers
(number) @number

; Booleans
(boolean) @constant.builtin

; Identifiers inside expressions
(identifier) @variable

; $prop identifiers
((identifier) @variable.special
  (#match? @variable.special "^\\$"))

; Operators and punctuation
(operator) @operator

; Comments
(comment) @comment
(comment_content) @comment

; Text
(text) @none

; Tag punctuation
(start_tag "<" @punctuation.bracket)
(start_tag ">" @punctuation.bracket)
(end_tag "</" @punctuation.bracket)
(end_tag ">" @punctuation.bracket)
(self_closing_element "<" @punctuation.bracket)
(self_closing_element "/>" @punctuation.bracket)
