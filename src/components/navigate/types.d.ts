
interface INavigateProps
    extends LinkProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    { children: React.ReactNode } {
    activeClassName?: string;
    withloading?: boolean;
}