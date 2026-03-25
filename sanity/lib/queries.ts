import { defineQuery } from 'next-sanity'

// ============================================
// SIDER (pages)
// ============================================

// Hent alle sider for navigasjon
export const PAGES_QUERY = defineQuery(`
  *[_type == "page"] | order(menuOrder asc) {
    _id,
    title,
    slug,
    pageType,
    menuOrder
  }
`)

// Hent én side basert på slug
export const PAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    pageType,
    menuOrder,
    content,
    contactEmail,
    contactPhone
  }
`)

// ============================================
// BLOGGINNLEGG (posts)
// ============================================

// Hent alle blogginnlegg
export const POSTS_QUERY = defineQuery(`
  *[_type == "post"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    listText,
    mainImage,
    categories[]->{ _id, title, slug }
  }
`)

// Hent ett blogginnlegg basert på slug
export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    listText,
    categories[]->{ _id, title, slug },
    plants[]->{ _id, title, slug },
    relatedPosts[]->{ _id, title, slug, mainImage, listText },
    relatedGuides[]->{ _id, title, slug, description, image },
    relatedPlants[]->{ _id, title, slug, image },
    content[]{
      ...,
      _type == "relatedGuide" => {
        ...,
        guide->{
          _id,
          title,
          slug,
          description,
          steps[]{
            _key,
            title,
            content,
            image
          }
        }
      },
      _type == "relatedPost" => {
        ...,
        post->{
          _id,
          title,
          slug
        }
      },
      // Ekspander interne lenker i marks
      markDefs[]{
        ...,
        _type == "internalLink" => {
          ...,
          reference->{
            _id,
            _type,
            title,
            slug
          }
        }
      }
    }
  }
`)

// ============================================
// KATEGORIER (category)
// ============================================

// Hent alle kategorier med innhold
export const CATEGORIES_QUERY = defineQuery(`
  *[_type == "category" && count(*[_type == "post" && ^._id in categories[]._ref]) > 0] | order(_createdAt desc) {
    _id,
    image,
    title,
    slug,
    "postCount": count(*[_type == "post" && ^._id 
  in categories[]._ref])
  }
`)

// Hent kategori basert på slug
export const CATEGORY_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    image
  }
`)

// ============================================
// PLANTER (plants)
// ============================================

// Hent plante basert på slug
export const PLANT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "plant" && slug.current == $plant][0] {
    _id,
    description,
    title,
    slug,
    image
  }
`)

// Hent alle planter
export const PLANTS_QUERY = defineQuery(`
  *[_type == "plant"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    image
  }
`)

// Hent planter basert på slug
export const PLANTS_BY_SLUG_QUERY = defineQuery(`
  *[_type == "plant" && plantType->slug.current == $plantType] {
  _id,
  title,
  slug,
  mainImage,
  "plantTypeTitle": plantType->title
}
`)

// ============================================
// PLANTETYPER (plantType)
// ============================================

// Hent alle plantetyper med innhold
export const PLANT_TYPES_QUERY = defineQuery(`
  *[_type == "plantType" && count(*[_type ==      
  "plant" && plantType._ref == ^._id]) > 0] {     
    _id,                                          
    title,                                        
    slug,                                         
    description,                                  
    image,                                        
    "categoryTitle": plantCategory->title,
    "plantCount": count(*[_type == "plant" &&     
  plantType._ref == ^._id])                       
  }                                               
`)

// Hent en plantetype basert på slug
export const PLANT_TYPE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "plantType" && plantCategory->slug.current == $slug][0] {
  _id,
  title,
  description,
  slug,
  mainImage,
  "categoryTitle": plantCategory->title
}
`)

// Hent plantetyper basert på slug
export const PLANT_TYPES_BY_SLUG_QUERY = defineQuery(`
  *[_type == "plantType" && plantCategory->slug.current == $slug] {
  _id,
  title,
  slug,
  mainImage,
  "categoryTitle": plantCategory->title
}
`)

// ============================================
// PLANTEKATEGORIER (plantCategory)
// ============================================

// Hent alle plantekategorier med innhold
export const PLANT_CATEGORY_QUERY = defineQuery(`
*[_type == "plantCategory" && count(                 
      *[_type == "plantType" && plantCategory._ref ==    
  ^._id &&                                               
        count(*[_type == "plant" && plantType._ref ==    
  ^._id]) > 0                                            
      ]                                                  
    ) > 0] {                                             
      _id,                                               
      title,                                             
      slug,                                              
      description,                                       
      image,                                             
      "plantCount": count(                               
        *[_type == "plantType" && plantCategory._ref ==  
  ^._id &&                                               
          count(*[_type == "plant" && plantType._ref ==  
  ^._id]) > 0                                            
        ]                                                
      )                                                  
    }                                                       
`)

// ============================================
// GUIDER (guides)
// ============================================

// Hent alle guider
export const GUIDES_QUERY = defineQuery(`
  *[_type == "guide"] | order(_createdAt desc) {
    _id,
    title,
    slug,
  }
`)

// Hent guide fra slug
export const GUIDE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "guide" && slug.current == $slug][0] {
    _id,
    title,
    slug,
  }
`)

// ============================================
// ÅRSHJUL
// ============================================

// Hent planter gruppert for årshjul (med sesonger og blomstringsmåneder)
export const AARSHJUL_QUERY = defineQuery(`
  *[_type == "plant" && (defined(seasons) || defined(flowering))] {
    _id,
    title,
    slug,
    image,
    description,
    seasons,
    flowering,
    harvest,
    themes,
    plantType->{ _id, title, slug }
  }
`)
