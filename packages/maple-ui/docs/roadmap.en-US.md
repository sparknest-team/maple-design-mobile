# Roadmap

Tracks Maple Design Mobile gaps versus mature mobile UI libraries, and API alignment with Cedar Design Web.

## Current: P0

| Item | Status | Notes |
| --- | --- | --- |
| Public Roadmap | Done | This page |
| SwipeCell | Done | Swipe actions on list cells |
| NoticeBar | Done | Announcement strip |
| NumberKeyboard | Done | Numeric keypad |
| VerificationCode | Done | OTP input (aligned with Cedar; based on the shared OTP interaction spec) |
| Sidebar / Grid | Planned | Category nav and entry mp-grid |
| Segmented (align Cedar) | Planned | Segmented control |
| a11y follow-through | Planned | Docs + keyboard/ARIA coverage |

## Next: P1

- ShareSheet, mobile Calendar
- Design resources for current brands and color modes
- CI / `.github`
- Toast / Notify layering (on top of Message)

## Later: P2

- Circle progress
- E-commerce kits only if product needs them

## Done

- Finish branding and dependency cleanup

## Relationship with Cedar

Shared APIs follow **Cedar (desktop)** as the source of truth. Maple stays in sync. Cross-end breaking changes go through OpenSpec.

## What we won't hard-follow

Skip Vant-style e-commerce kits unless the product clearly needs them.
