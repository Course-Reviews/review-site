import classNames from 'classnames';
import classnames from 'classnames';
import Link, { LinkProps } from 'next/link';
import React, { HTMLAttributes } from 'react';
import { useRouter } from 'next/router';

interface BreadCrumbsProps extends HTMLAttributes<HTMLElement> {}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ children, className, ...rest }) => (
  <div className={classNames('flex', className)} {...rest}>
    {React.Children.map(children, (child: any, i) => (
      <>
        {child}
        {i < React.Children.count(children) - 1 && <div className={'text-gray-300 mx-2'}>/</div>}
      </>
    ))}
  </div>
);

interface BreadCrumbItemProps extends HTMLAttributes<HTMLElement>, LinkProps {}

const BreadCrumbItem: React.FC<BreadCrumbItemProps> = ({
  children,
  className,
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref,
  prefetch,
  locale,
  ...rest
}) => {
  const router = useRouter();

  console.log(router.asPath, href);


  return (
    <Link {...{ href, as, replace, scroll, shallow, passHref, prefetch, locale }}>
      <a
        className={classNames(
          'hover:text-primary-500',
          router.asPath === encodeURI(`${href}`) ? 'font-semibold text-primary-500' : 'text-gray-700',
          className
        )}
        {...rest}
      >
        {children}
      </a>
    </Link>
  );
};

export default Object.assign(BreadCrumbs, {
  Item: BreadCrumbItem,
});
