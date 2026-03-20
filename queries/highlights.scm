; Tags
(tag_name) @tag

; Control flow tags as keywords
((tag_name) @keyword
  (#match? @keyword "^(show-me|hide-me|in-case|or-case|no-case|switch-on|case-of|fall-back|for-each|slot)$"))

; Empty tags
((tag_name) @keyword
  (#match? @keyword "^empty-"))

; Component tags (hyphenated, ending with HTML tag)
((tag_name) @type
  (#match? @type "^[a-z]+-.*-[a-z]+$"))

; Attribute names
(attribute_name) @attribute

; Special attribute names
((attribute_name) @keyword
  (#match? @keyword "^(css|theme|on-[a-z]+|action-[a-z]+)$"))

; Private props ($name)
((attribute_name) @variable.special
  (#match? @variable.special "^\\$"))

; Active attribute
((attribute_name) @keyword
  (#match? @keyword "^active$"))

; Quoted attribute values
(quoted_attribute_value) @string
(attribute_string_content_double) @string
(attribute_string_content_single) @string

; Expression values (inside {})
(expression_value) @embedded

; Text expressions
(expression) @embedded

; Strings inside expressions
(expression_content (string) @string)

; Comments
(comment) @comment
(comment_content) @comment

; Text
(text) @none

; Punctuation
(start_tag "<" @punctuation.bracket)
(start_tag ">" @punctuation.bracket)
(end_tag "</" @punctuation.bracket)
(end_tag ">" @punctuation.bracket)
(self_closing_element "<" @punctuation.bracket)
(self_closing_element "/>" @punctuation.bracket)
