import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css'


// POST COMPONENT

export default function Post({ postData }) {
  return (
    <Layout>

      <Head>
        <title>{postData.title}</title>
      </Head>

        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightTetxt}>
              <Date dateString={postData.date} />
</div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

// GET STATIC PATHS COMPONENT

export async function getStaticPaths() {
const paths = getAllPostIds();
return {
  paths,
  fallback: false,
};
}

// GET STATIC PROPS COMPONENT

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}



  
