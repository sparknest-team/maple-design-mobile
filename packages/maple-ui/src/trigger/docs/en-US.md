# Trigger

A style-agnostic floating-layer primitive that manages trigger events, positioning, teleporting, and open state. Popover, Menu, Select, and related components are built on Trigger.

Trigger does not render a host DOM element. It binds trigger behavior to the first valid element in the default slot, while the `content` slot renders the floating content.
