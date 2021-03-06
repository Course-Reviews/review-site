import classNames from 'classnames';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { HTMLAttributes } from 'react';
import { FiHome } from 'react-icons/fi';

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

interface BreadCrumbItemHomeProps extends HTMLAttributes<HTMLElement> {}

const BreadCrumbItemHome: React.FC<BreadCrumbItemHomeProps> = ({
  children,
  className,
  ...rest
}) => {
  const router = useRouter();

  return (
    <Link href='/'>
      <a
        className={classNames(
          'hover:text-primary-500',
          router.asPath === '/' ? 'font-semibold text-primary-500' : 'text-gray-700',
          className
        )}
        aria-label='Home'
        {...rest}

      >
        <FiHome className={'inline align-middle relative -top-0.5'}/>
      </a>
    </Link>
  );
};

export default Object.assign(BreadCrumbs, {
  Item: BreadCrumbItem,
  Home: BreadCrumbItemHome,
});
