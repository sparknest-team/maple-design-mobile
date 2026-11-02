## ADDED Requirements
### Requirement: Reading-direction aware form alignment
The Form and FormItem SHALL accept start/end for labelAlign and contentAlign, with center also available for contentAlign. Omitted contentAlign SHALL resolve to start and omitted labelAlign SHALL resolve to end. Explicit left/right SHALL remain physical, and item overrides and explicit column styles SHALL retain precedence.
#### Scenario: RTL inherited alignment
- WHEN an RTL form omits alignment
- THEN content starts at its right edge and horizontal labels align toward the content
- AND switching direction preserves business values and validation state
#### Scenario: Physical alignment override
- WHEN left or right is explicitly configured
- THEN text and flex alignment use the same physical side in both reading directions
