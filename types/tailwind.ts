export const colors = ['primary' , 'secondary' , 'warning' , 'success' , 'danger', 'info', 'gray'] as const;
export const sizes = ['sm', 'md', 'lg'] as const;
export const positions = ['start', 'center', 'end'] as const;

export type Color = (typeof colors[number])
export type Size = (typeof sizes[number])
export type Position = (typeof positions[number])
