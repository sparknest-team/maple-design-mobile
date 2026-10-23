## ADDED Requirements

### Requirement: Field presentation and pretty reading are independent
The field SHALL inherit presentation and readPretty independently from FormItem and Form, with field values taking precedence and explicit false overriding inherited true. The default SHALL remain inline and readPretty=false.

#### Scenario: Read without mounting a control
- WHEN readPretty is true
- THEN render the formatted committed value or read slot without an editor or search request.

#### Scenario: Desktop activation
- WHEN Cedar presentation is click or dblclick and the matching pointer action occurs, or Enter/F2 is pressed
- THEN show the original field in a viewport-bounded overlay at the field position, preserving layout space.

#### Scenario: Mobile activation
- WHEN Maple presentation is popup and the value region is activated
- THEN open the mobile editor with a left-aligned input/select title, close control and bottom confirmation.

#### Scenario: Transaction safety
- WHEN confirmation fails validation or beforeCommit refuses
- THEN retain the draft without changing the committed model.
- WHEN confirming asynchronously
- THEN freeze editing and duplicate confirmation/cancellation.
- WHEN resetting, changing state/presentation or replacing the external model
- THEN close the editor, abort pending confirmation and ignore late work.
