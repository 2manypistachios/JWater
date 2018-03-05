import CMS from 'netlify-cms';
import 'netlify-cms/dist/cms.css';

import AboutPagePreview from './preview-templates/AboutPagePreview';
import ProductPagePreview from './preview-templates/ProductPagePreview';
//import BlogPostPreview from './preview-templates/BlogPostPreview';

CMS.registerPreviewStyle('/styles.css');
CMS.registerPreviewTemplate('about', AboutPagePreview);
CMS.registerPreviewTemplate('products', ProductPagePreview);
//CMS.registerPreviewTemplate('blog', BlogPostPreview);
