/* eslint-disable @next/next/no-page-custom-font */
import { VFC } from 'react'
import Head from 'next/head'

interface MetaData {
  pageTitle?: string
  pageDescription?: string
  pagePath?: string
  pageImg?: string
  pageImgWidth?: number
  pageImgHeight?: number
}

const Seo: VFC<MetaData> = ({
  pageTitle,
  pageDescription,
  pagePath,
  pageImg,
  pageImgWidth,
  pageImgHeight
}) => {
  const defaultTitle = 'Shizuk'
  const defaultDescription = 'Shizuk'

  const title = defaultTitle
  const description = defaultDescription
  const url = pagePath
  const imgUrl = pageImg
  const imgWidth = pageImgWidth ? pageImgWidth : 1920
  const imgHeight = pageImgHeight ? pageImgHeight : 1005

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content={String(imgWidth)} />
      <meta property="og:image:height" content={String(imgHeight)} />
      <link rel="preconnect" href="https://shizuk-mint-site.vercel.app/_next/image?url=%2Fmain_grap.png&w=3840&q=75" />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&amp;display=swap"
        rel="stylesheet"
      />
      <link rel="canonical" href={url} />
    </Head>
  )
}

export default Seo