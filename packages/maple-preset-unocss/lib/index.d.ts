import { Preset } from 'unocss';

interface PresetMapleOptions {
    breakpoints?: boolean | {
        sm?: string | number;
        md?: string | number;
        lg?: string | number;
        xl?: string | number;
    };
    fontSize?: boolean;
    colors?: boolean | PresetMapleColors;
}
interface PresetMapleColors {
    body?: string;
    text?: string;
    primary?: string;
    info?: string;
    warning?: string;
    danger?: string;
    success?: string;
    disabled?: string;
    textDisabled?: string;
    onPrimary?: string;
    onInfo?: string;
    onWarning?: string;
    onDanger?: string;
    onSuccess?: string;
    primaryContainer?: string;
    infoContainer?: string;
    warningContainer?: string;
    dangerContainer?: string;
    successContainer?: string;
    onPrimaryContainer?: string;
    onInfoContainer?: string;
    onWarningContainer?: string;
    onDangerContainer?: string;
    onSuccessContainer?: string;
    surfaceContainer?: string;
    surfaceContainerLow?: string;
    surfaceContainerHigh?: string;
    surfaceContainerHighest?: string;
    inverseSurface?: string;
    outline?: string;
    onSurfaceVariant?: string;
    hslBody?: string;
    hslText?: string;
    hslPrimary?: string;
    hslInfo?: string;
    hslWarning?: string;
    hslDanger?: string;
    hslSuccess?: string;
    hslDisabled?: string;
    hslTextDisabled?: string;
    hslOnPrimary?: string;
    hslOnInfo?: string;
    hslOnWarning?: string;
    hslOnDanger?: string;
    hslOnSuccess?: string;
    hslPrimaryContainer?: string;
    hslInfoContainer?: string;
    hslWarningContainer?: string;
    hslDangerContainer?: string;
    hslSuccessContainer?: string;
    hslOnPrimaryContainer?: string;
    hslOnInfoContainer?: string;
    hslOnWarningContainer?: string;
    hslOnDangerContainer?: string;
    hslOnSuccessContainer?: string;
    hslSurfaceContainer?: string;
    hslSurfaceContainerLow?: string;
    hslSurfaceContainerHigh?: string;
    hslSurfaceContainerHighest?: string;
    hslInverseSurface?: string;
    hslOutline?: string;
    hslOnSurfaceVariant?: string;
}
declare function presetMaple(options?: PresetMapleOptions): Preset;

export { PresetMapleColors, PresetMapleOptions, presetMaple };
