## MODIFIED Requirements
### Requirement: Reference native event ownership
A custom native reference SHALL route focus/blur notifications to the public field and owning Form handlers once per emitted native field cycle. Switching between range endpoints SHALL not create an extra cycle. Ordinary listener return values SHALL not start pending task state. Vue SHALL own Once listener lifetime.
#### Scenario: Two native focus cycles
- WHEN a reference gains and loses focus twice
- THEN public and Form handlers each see two focus/blur pairs, while a Once listener runs once even if it returns an unresolved Promise.
### Requirement: Readonly clicks notify while disabled clicks remain blocked
DateRange references SHALL notify ordinary clicks in readonly mode without editing or opening. Disabled clicks SHALL not notify or consume Once listeners before enabling.
#### Scenario: Disabled once click
- WHEN a reference is clicked while disabled and later enabled
- THEN the disabled attempt does not notify, and the first enabled click consumes the Once listener.
