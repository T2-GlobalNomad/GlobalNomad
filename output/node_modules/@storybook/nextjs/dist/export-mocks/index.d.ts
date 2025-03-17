declare const getPackageAliases: ({ useESM }?: {
    useESM?: boolean;
}) => {
    [k: string]: string;
};

export { getPackageAliases };
