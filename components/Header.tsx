import { useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import BLOG from '@/blog.config'
import { useLocale } from '@/lib/locale'
import classNames from 'classnames'

const NavBar: React.VFC = () => {
  const locale = useLocale()
  const router = useRouter()
  if (!locale) return null
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || '/', show: true },
    { id: 1, name: locale.NAV.ABOUT, to: '/about', show: BLOG.showAbout },
    { id: 2, name: locale.NAV.RSS, to: '/feed', show: true }
  ]
  const activeNav = useMemo(() => {
    if (router.asPath === links[1].to) return links[1].to
    if (router.pathname === links[0].to || router.asPath.includes('tag'))
      return links[0].to
    return null
  }, [router])

  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map(
          link =>
            link.show && (
              <li
                key={link.id}
                className={classNames(
                  'block ml-4 text-black dark:text-gray-50 nav',
                  {
                    'border-b-2 border-indigo-400': link.to === activeNav
                  }
                )}
              >
                <Link href={link.to}>
                  <a>{link.name}</a>
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  )
}

type HeaderProps = {
  navBarTitle: string | null
  fullWidth?: boolean
}
const Header: React.VFC<HeaderProps> = ({ navBarTitle, fullWidth }) => {
  const navRef = useRef<HTMLDivElement>(null)
  const sentinalRef = useRef<HTMLDivElement>(null)
  const useSticky = !BLOG.autoCollapsedNavBar
  const handler = ([entry]: IntersectionObserverEntry[]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current.classList.add('sticky-nav-full')
      } else {
        navRef.current.classList.remove('sticky-nav-full')
      }
    } else {
      navRef?.current?.classList.add('remove-sticky')
    }
  }
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler)
    if (sentinalRef?.current) obvserver.observe(sentinalRef.current)
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
  }, [sentinalRef])
  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinalRef}></div>
      <div
        className={classNames(
          'sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60',
          {
            'px-4 md:px-24': fullWidth,
            'max-w-3xl px-4': !fullWidth
          }
        )}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/">
            <a aria-label={BLOG.title}>
              <div className="h-6">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M507.815 990.393c-108.503 0-210.525-40.909-287.272-115.192-76.821-74.352-119.13-173.234-119.13-278.425 0-73.846 19.934-144.955 57.647-205.635 4.777-7.684 8.019-16.343 11.451-25.509 5.022-13.411 10.216-27.281 20.708-38.595 11.279-12.16 27.372-20.649 42.934-28.858 9.729-5.133 18.92-9.979 26.55-15.466 20.542-14.77 42.783-27.712 66.108-38.473 5.108-6.011 3.349-43.007 2.181-67.562-2.374-49.925-4.828-101.551 15.287-121.102 3.443-3.345 7.825-5.116 12.672-5.116 15.552 0 37.479 19.912 65.173 59.184 20.168 28.6 38.691 61.259 41.291 72.798 1.443 6.41 13.55 20 19.351 21.724-0.047-0.019 0.397 0.055 1.49 0.055 1.767 0 4.226-0.173 7.072-0.373 4.459-0.312 10.009-0.702 16.487-0.702 22.92 0 44.584 5.55 65.534 10.918 19.885 5.095 38.67 9.908 57.528 9.908 0.004 0 0.006 0 0.008 0 1.836 0 3.669-0.047 5.451-0.139 2.753-0.145 11.129-4.154 15.456-7.402 13.712-10.292 34.469-32.832 56.444-56.695 46.407-50.394 75.993-80.992 95.513-80.992 5.661 0 10.531 2.519 13.707 7.093 10.35 14.894 14.538 25.829 16.598 43.334 0.224 1.908 0.502 4.04 0.807 6.393 3.678 28.408 11.302 87.288-15.093 165.664 1.294 10.177 5.443 33.088 12.572 42.283 49.733 64.17 81.869 163.58 81.869 253.261 0 105.192-42.307 204.073-119.126 278.425-76.746 74.285-178.765 115.194-287.266 115.194zM356.952 67.395c-0.491 0-0.623 0.085-0.869 0.325-14.642 14.23-12.06 68.516-10.175 108.155 2.391 50.298 2.96 76.859-11.665 83.587-22.469 10.339-43.886 22.789-63.652 37.001-8.58 6.167-18.725 11.518-28.535 16.694-14.307 7.549-29.103 15.353-38.418 25.396-8.22 8.864-12.613 20.597-17.266 33.02-3.571 9.535-7.263 19.396-12.928 28.508-36.045 57.991-55.097 126.008-55.097 196.694 0 207.704 174.714 376.684 389.467 376.684 214.749 0 389.459-168.98 389.459-376.684 0-86.161-30.742-181.499-78.319-242.886-11.876-15.315-15.827-48.871-16.239-52.646l-0.203-1.874 0.61-1.786c25.861-75.555 18.489-132.483 14.945-159.841-0.314-2.427-0.598-4.625-0.828-6.589-1.725-14.651-4.901-22.971-13.565-35.473-13.582 0.166-55.334 45.507-82.981 75.528-22.518 24.452-43.784 47.547-58.74 58.768-4.254 3.191-16.384 10.331-24.736 10.766-2.075 0.109-4.205 0.164-6.333 0.164-0.002 0-0.006 0-0.008 0-20.994 0-41.703-5.306-61.731-10.438-19.936-5.106-40.548-10.388-61.333-10.388-5.885 0-11.106 0.367-15.304 0.66-3.165 0.222-5.897 0.414-8.256 0.414-2.559 0-4.548-0.235-6.262-0.741-12.662-3.731-28.512-22.766-31.099-34.25-1.62-7.193-17.468-36.777-38.61-66.761-28.945-41.054-45.884-52.008-51.329-52.008zM275.405 646.261c5.404-1.863 25.167-1.831-2.243-30.679 37.146 41.114 114.091-49.594 12.465-78.356-27.379-7.752-103.301-4.943-92.465 44.204 2.162 5.123 25.577 26.693 26.316 24.587-30.341-4.502-10.1 40.006 20.868 43.968 5.993 0.773 29.347-1.754 35.06-3.723zM277.139 703.495c-54.471-38.153-109.235 12.239-52.821 33.122 40.004 14.8 44.802 7.658 81.069 13.419 24.256 3.859 163.992 11.342 166.374-32.109-5.78 0.525-0.63 11.486 0 0-43.048 3.9-87.528 13.052-106.279 16.659-13.929 2.679-28.399-11.782-45.711-17.75l-42.632-13.34zM522.609 422.17c37.865-2.164 69.6 46.166 69.6 46.166s-31.735 50.847-66.356 49.767c-34.623-1.082-33.046-13.313-57.344-19.114-24.158-5.771 16.233-74.655 54.1-76.819zM511.833 446.396c5.146-6.696 19.242 20.134 21.342 2.117 0.719-6.132-1.441-9.016-24.884-8.659-23.439 0.361-33.899 51.071-19.112 59.509 11.402 6.504 19.682 17.639 16.066 3.257-3.024-12.009-0.961-46.403 6.589-56.224zM279.075 380.125c28.849 0 38.224 18.755 38.949 29.216 0.721 10.459-18.032 51.571-36.785 51.571-8.809 0.004-32.264-12.282-34.619-31.189-2.66-21.344 17.155-49.598 32.456-49.598zM275.098 392.789c5.396-7.727-20.706 5.505-18.875 29.312 1.831 23.801 26.138 34.484 20.805 27.218-19.667-26.785-5.146-61.327-10.446-51.423 5.313 4.006 16.495-4.649 3.883-6.745-0.794-0.13 4.154 2.322 4.632 1.639zM305.614 399.378c-2.886 0-5.227 2.502-5.227 5.592 0 3.086 2.341 5.59 5.227 5.59 2.888 0 5.231-2.504 5.231-5.59 0-3.089-2.342-5.592-5.231-5.592z" fill="#515151"></path></svg>
              </div>
            </a>
          </Link>
          {navBarTitle ? (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {navBarTitle}
            </p>
          ) : (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {BLOG.title} -
              <span className="font-normal">{BLOG.description}</span>
            </p>
          )}
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Header
