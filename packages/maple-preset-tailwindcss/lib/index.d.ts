interface PresetMapleOptions {
    screens?: boolean | PresetMapleScreens;
    fontSize?: boolean | PresetMapleFontSize;
    colors?: boolean | PresetMapleColors;
}
interface PresetMapleScreens {
    sm?: string | number;
    md?: string | number;
    lg?: string | number;
    xl?: string | number;
}
interface PresetMapleFontSize {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
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
    'text-disabled'?: string;
    'on-primary'?: string;
    'on-info'?: string;
    'on-warning'?: string;
    'on-danger'?: string;
    'on-success'?: string;
    'primary-container'?: string;
    'info-container'?: string;
    'warning-container'?: string;
    'danger-container'?: string;
    'success-container'?: string;
    'on-primary-container'?: string;
    'on-info-container'?: string;
    'on-warning-container'?: string;
    'on-danger-container'?: string;
    'on-success-container'?: string;
    'surface-container'?: string;
    'surface-container-low'?: string;
    'surface-container-high'?: string;
    'surface-container-highest'?: string;
    'inverse-surface'?: string;
    outline?: string;
    'on-surface-variant'?: string;
    'hsl-body'?: string;
    'hsl-text'?: string;
    'hsl-primary'?: string;
    'hsl-info'?: string;
    'hsl-warning'?: string;
    'hsl-danger'?: string;
    'hsl-success'?: string;
    'hsl-disabled'?: string;
    'hsl-text-disabled'?: string;
    'hsl-on-primary'?: string;
    'hsl-on-info'?: string;
    'hsl-on-warning'?: string;
    'hsl-on-danger'?: string;
    'hsl-on-success'?: string;
    'hsl-primary-container'?: string;
    'hsl-info-container'?: string;
    'hsl-warning-container'?: string;
    'hsl-danger-container'?: string;
    'hsl-success-container'?: string;
    'hsl-on-primary-container'?: string;
    'hsl-on-info-container'?: string;
    'hsl-on-warning-container'?: string;
    'hsl-on-danger-container'?: string;
    'hsl-on-success-container'?: string;
    'hsl-surface-container'?: string;
    'hsl-surface-container-low'?: string;
    'hsl-surface-container-high'?: string;
    'hsl-surface-container-highest'?: string;
    'hsl-inverse-surface'?: string;
    'hsl-outline'?: string;
    'hsl-on-surface-variant'?: string;
}
declare function presetMaple(options?: PresetMapleOptions): {
    theme: {
        extend: {
            colors: PresetMapleColors | undefined;
            screens: PresetMapleScreens | undefined;
            fontSize: PresetMapleFontSize | undefined;
        };
    };
};

export { PresetMapleColors, PresetMapleFontSize, PresetMapleOptions, PresetMapleScreens, presetMaple };
