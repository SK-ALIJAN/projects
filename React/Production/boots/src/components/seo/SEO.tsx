import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    ogImage?: string;
    ogType?: string;
    twitterCard?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    canonical,
    ogImage,
    ogType = 'website',
    twitterCard = 'summary_large_image',
}) => {
    const siteTitle = `${title} | Enterprise React App`;

    return (
        <Helmet>
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            {canonical && <link rel="canonical" href={canonical} />}

            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            {ogImage && <meta property="og:image" content={ogImage} />}
            {canonical && <meta property="og:url" content={canonical} />}

            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={description} />
            {ogImage && <meta name="twitter:image" content={ogImage} />}
        </Helmet>
    );
};

export default SEO;
