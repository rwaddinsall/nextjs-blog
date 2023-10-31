import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'Rhys Addinsall'
export const siteTitle = 'Next.js Personal Website';

// meta tags (like og:image), which are used to describe a page's content
// Boolean home prop which will adjust the size of the title and the image
// "Back to home" link at the bottom if home is false
// Added images with next/image, which are preloaded with the priority attribute

export default function Layout ({ children, home }) {

    return <div className={styles.container}>
         <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Rhys Addinsall - Developer"
        />
        <meta
          property="og:image"
          content={(siteTitle)}

        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
            <>
            {/* Added images with next/image, which are preloaded with the priority attribute */}
            <Image
            priority
            src="/images/profile.jpg"
            className={utilStyles.borderCircle}
            height={144}
            width={144}
            alt="profile image"
          />
          <h1 className={utilStyles.heading2Xl}>{name}</h1>
        </>
      ) : (
        <>
          <Link href="/">
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={108}
              width={108}
              alt=""
            />
          </Link>
          <h2 className={utilStyles.headingLg}>
            <Link href="/" className={utilStyles.colorInherit}>
              {name}
            </Link>
          </h2>
        </>
      )}
    </header>
    <main>{children}</main>
    {!home && (
      <div className={styles.backToHome}>
        <Link href="/">← Back to home</Link>
      </div>
    )}
  </div>

}