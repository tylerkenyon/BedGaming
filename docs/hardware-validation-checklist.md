# Hardware Validation Checklist

## Automated tested

- Schema validation
- Gaming mode orchestration state transitions
- Diagnostics service outputs
- Renderer shell rendering

## Hardware tested

_Not executed in this environment._

## Manual validation checklist

1. Connect laptop to TV over HDMI.
2. Verify TV detection in Setup Wizard hardware step.
3. Pair DualSense over Bluetooth and USB and verify detection.
4. Verify DS4Windows and HidHide detection/repair flows.
5. Enter TV mode and confirm display/audio switch.
6. Launch Playnite and a game through controller navigation.
7. Exit game and confirm launcher focus restoration.
8. Exit TV mode and confirm original display/audio restoration.
9. Force-close Bed Gaming during TV mode, relaunch, and validate recovery flow.
10. Uninstall and verify configuration preservation/cleanup behavior.
