import { templateConstants } from "../constants";

const initialState = {
  templateDetails: {
    categories: [],
    starTemplateLinks: [],
    externalTemplateSource: {}
  },
  templates: {
    content: [],
    first: true,
    last: true,
    number: 0,
    numberOfElements: 0,
    size: 0,
    sort: [],
    totalElements: 0,
    totalPages: 1
  },
  castroles: [],
  crewroles: []
};
export function template(state = initialState, action) {
  switch (action.type) {
    case templateConstants.TEMPLATES_GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case templateConstants.TEMPLATES_GETALL_SUCCESS:
      return {
        ...state,
        templates: action.templates,
        url: action.url,
        loading: false
      };
    case templateConstants.TEMPLATES_GETALL_FAILURE:
      return {
        ...state,
        loading: false
      };
    case templateConstants.TEMPLATE_DELETE_SUCCESS:
      return {
        ...state,
        templates: {
          content: state.templates.content.filter(
            template => template.id !== action.template.id
          )
        }
      };

    case templateConstants.TEMPLATE_DELETE_FAILURE:
      return {
        ...state
      };
    case templateConstants.TEMPLATE_GET_SUCCESS:
      return {
        ...state,
        templateDetails: action.templateDetails
      };
    case templateConstants.TEMPLATE_GET_FAILURE:
      return {
        ...state,
        template: {}
      };
    case templateConstants.TEMPLATE_CATEGORIES_SUCCESS:
      return {
        ...state,
        categoryList: action.categoryList,
        templatecategoryLoading: false
      };
    case templateConstants.TEMPLATE_CATEGORIES_FAILURE:
      return {
        ...state,
        categoryList: {},
        templatecategoryLoading: false
      };

    case templateConstants.TEMPLATE_ADD_SUCCESS:
      return {
        ...state,
        templateDetails: action.template,
        loading: false,
        date: new Date().getTime()
      };
    case templateConstants.TEMPLATE_ADD_FAILURE:
      return {
        ...state,
        loading: false,
        date: new Date().getTime()
      };
    case templateConstants.TEMPLATE_UPDATEPROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        date: new Date().getTime()
      };
    case templateConstants.TEMPLATE_UPDATEPROFILE_SUCCESS:
      return {
        ...state,
        templateDetails: action.template,
        loading: false
      };
    case templateConstants.TEMPLATE_GETGALLERY_SUCCESS:
      return {
        ...state,
        gallery: action.gallery,
        isGalleryLoaded: true
      };
    case templateConstants.TEMPLATE_GETGALLERY_FAILURE:
      return {
        ...state
      };
    case templateConstants.TEMPLATE_GETMOVIES_SUCCESS:
      return {
        ...state,
        movies: action.movies
      };
    case templateConstants.TEMPLATE_GETMOVIES_FAILURE:
      return {
        ...state
      };
    case templateConstants.TEMPLATE_UPLOAD_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        templateDetails: {
          ...state.templateDetails,
          thumbnailImageLocation:
            action.template.thumbnailImageLocation + "?" + new Date().getTime(),
          loading: false
        }
      };
    case templateConstants.TEMPLATE_UPLOAD_PROFILE_IMAGE_FAILURE:
      return {
        ...state,
        templateDetails: {
          ...state.templateDetails,
          loading: false
        }
      };
    case templateConstants.TEMPLATE_UPLOAD_BANNER_IMAGE_SUCCESS:
      return {
        ...state,
        templateDetails: {
          ...state.templateDetails,
          bannerImageLocation:
            action.template.bannerImageLocation + "?" + new Date().getTime(),
          loading: false
        }
      };
    case templateConstants.TEMPLATE_UPLOAD_BANNER_IMAGE_FAILURE:
      return {
        ...state,
        templateDetails: {
          ...state.templateDetails,
          loading: false
        }
      };

    case templateConstants.TEMPLATE_DELETE_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        templateDetails: action.templateDetails
      };
    case templateConstants.TEMPLATE_DELETE_PROFILE_IMAGE_FAILURE:
      return {
        ...state
      };
    case templateConstants.TEMPLATE_DELETE_BANNER_IMAGE_SUCCESS:
      return {
        ...state,
        templateDetails: action.templateDetails
      };
    case templateConstants.TEMPLATE_DELETE_BANNER_IMAGE_FAILURE:
      return {
        ...state
      };

    case templateConstants.TEMPLATE_DELETE_GALLERY_IMAGE_SUCCESS:
      return {
        ...state,
        gallery: {
          content: state.gallery.content.filter(
            gallery => gallery.id !== action.img
          ),
          first: state.gallery.first,
          last: state.gallery.last,
          number: state.gallery.number,
          numberOfElements: state.gallery.numberOfElements - 1,
          size: state.gallery.size - 1,
          totalElements: state.gallery.totalElements - 1,
          totalPages: state.gallery.totalPages
        }
      };
    case templateConstants.TEMPLATE_GET_TAGGED_TEMPLATES_SUCCESS:
      return {
        ...state,
        template: {
          content: action.template
        }
      };
    case templateConstants.TEMPLATE_DELETE_TAGGED_TEMPLATES_SUCCESS:
      return {
        ...state,
        template: {
          content: state.template.content.filter(
            template => template.id !== action.template.id
          )
        }
      };

    case templateConstants.TEMPLATE_UPLOAD_GALLERY_IMAGE_REQUEST:
      return {
        ...state
      };
    case templateConstants.TEMPLATE_UPLOAD_GALLERY_IMAGE_SUCCESS:
      return {
        ...state,
        templateDetails: {
          ...state.templateDetails,
          loading: false
        }
      };
    case templateConstants.TEMPLATE_UPLOAD_GALLERY_IMAGE_FAILURE:
      return {
        ...state,
        templateDetails: {
          ...state.templateDetails,
          loading: false
        }
      };
    case templateConstants.TEMPLATE_VERIFY_REQUEST:
      return {
        ...state
      };
    case templateConstants.TEMPLATE_VERIFY_SUCCESS:
      return {
        ...state,
        templateDetails: {
          ...state.templateDetails,
          verified: action.template.verified,
          status: action.template.status
        }
      };

    case templateConstants.TEMPLATE_VERIFY_FAILURE:
      return {
        ...state
      };
    case templateConstants.TEMPLATE_MARKFORDELETE_SUCCESS:
      return {
        ...state,
        templateDetails: {
          ...state.templateDetails,
          markForDelete: action.markForDelete
        }
      };

    case templateConstants.TEMPLATE_MARKFORDELETE_FAILURE:
      return {
        ...state
      };

    case templateConstants.TEMPLATE_MARKFORUNDELETE_SUCCESS:
      return {
        ...state,
        templateDetails: {
          ...state.templateDetails,
          markForDelete: action.markForDelete
        }
      };

    case templateConstants.TEMPLATE_MARKFORUNDELETE_FAILURE:
      return {
        ...state
      };
    case templateConstants.TEMPLATE_DOWNLOAD_IMAGE_FROM_URL_REQUEST:
      return {
        ...state
      };
    case templateConstants.TEMPLATE_DOWNLOAD_IMAGE_FROM_URL_SUCCESS:
      return {
        ...state,
        imageBase64: action.image
      };
    case templateConstants.TEMPLATE_DOWNLOAD_IMAGE_FROM_URL_FAILURE:
      return {
        ...state
      };
    case templateConstants.TEMPLATE_LANGUAGE_SUCCESS:
      return {
        ...state,
        languages: action.languages
      };
    case templateConstants.TEMPLATE_LANGUAGE_FAILURE:
      return {
        ...state,
        languages: []
      };
    case templateConstants.TEMPLATE_GET_ROLES_SUCCESS:
      return {
        ...state,
        roles: action.roles
      };
    case templateConstants.TEMPLATE_GET_ROLES_FAILURE:
      return {
        ...state,
        roles: []
      };
    case templateConstants.TEMPLATE_GET_RELATIONSHIPS_SUCCESS:
      return {
        ...state,
        relationships: action.relationships
      };
    case templateConstants.TEMPLATE_GET_RELATIONSHIPS_FAILURE:
      return {
        ...state,
        relationships: []
      };
    case templateConstants.TEMPLATE_GET_VIDEO_TYPES_SUCCESS:
      return {
        ...state,
        videoTypes: action.videoTypes
      };
    case templateConstants.TEMPLATE_GET_VIDEO_TYPES_FAILURE:
      return {
        ...state,
        videoTypes: []
      };
    case templateConstants.TEMPLATE_ADD_VIDEO_CHANNEL_SUCCESS:
      return {
        ...state,
        videos: {
          content: state.videos.content.concat(action.videos)
        },
        videoType: action.videoChannelURL
      };
    case templateConstants.TEMPLATE_ADD_VIDEO_CHANNEL_FAILURE:
      return {
        ...state,
        videoType: action.videoChannelURL
      };

    case templateConstants.TEMPLATE_GET_VIDEO_CHANNEL_SUCCESS:
      return {
        ...state,
        videos: action.videos,
        isVideosLoaded: true
      };
    case templateConstants.TEMPLATE_GET_VIDEO_CHANNEL_FAILURE:
      return {
        ...state,
        videos: []
      };

    case templateConstants.TEMPLATE_DELETE_VIDEO_CHANNEL_SUCCESS:
      return {
        ...state,
        videos: {
          content: state.videos.content.filter(video => video.id !== action.id)
        }
      };
    case templateConstants.TEMPLATE_DELETE_VIDEO_CHANNEL_FAILURE:
      return {
        ...state
      };

    case templateConstants.TEMPLATE_DELETE_STAR_SUCCESS:
      return {
        ...state,
        templateDetails: {
          ...state.templateDetails,
          starTemplateLinks: state.templateDetails.starTemplateLinks.map(star =>
            star.id === action.id
              ? { ...star, deletedFromTemplate: true }
              : star
          )
        }
      };

    case templateConstants.TEMPLATE_DELETE_STAR_FAILURE:
      return {
        ...state
      };

    case templateConstants.TEMPLATE_MARK_FOR_DELETE_SUCCESS:
      return {
        ...state,
        templateDetails: {
          ...state.templateDetails,
          starTemplateLinks: state.templateDetails.starTemplateLinks.map(star =>
            star.id === action.id ? { ...star, markForDelete: true } : star
          )
        }
      };
    case templateConstants.TEMPLATE_MARK_FOR_DELETE_FAILURE:
      return {
        ...state
      };
    case templateConstants.TEMPLATE_MARK_FOR_UNDELETE_SUCCESS:
      return {
        ...state,
        templateDetails: {
          ...state.templateDetails,
          starTemplateLinks: state.templateDetails.starTemplateLinks.map(star =>
            star.starId === action.starId
              ? { ...star, markForDelete: false }
              : star
          )
        }
      };
    case templateConstants.TEMPLATE_MARK_FOR_UNDELETE_FAILURE:
      return {
        ...state
      };
    case templateConstants.TEMPLATE_ADD_CAST_CREW_SUCCESS:
      return {
        ...state,
        templateDetails: {
          ...state.templateDetails,
          starTemplateLinks: action.stars
        }
      };
    case templateConstants.TEMPLATE_ADD_CAST_CREW_FAILURE:
      return {
        ...state
      };
    case templateConstants.TEMPLATE_GET_IVA_SUCCESS:
      return {
        ...state,
        ivaImages: action.images
      };
    case templateConstants.TEMPLATE_GET_IVA_FAILURE:
      return {
        ...state
      };
    case templateConstants.TEMPLATE_ADD_IVA_IMAGES_SUCCESS:
      return {
        ...state,
        gallery: {
          content: action.gallery,
          first: state.gallery.first,
          last: state.gallery.last,
          number: state.gallery.number,
          numberOfElements: state.gallery.numberOfElements + 1,
          size: state.gallery.size,
          totalElements: state.gallery.totalElements + 1,
          totalPages: state.gallery.totalPages
        }
      };
    case templateConstants.TEMPLATE_ADD_IVA_IMAGES_FAILURE:
      return {
        ...state
      };
    case templateConstants.TEMPLATE_UPDATE_STAR_SUCCESS:
      return {
        ...state,
        templateDetails: {
          ...state.templateDetails,
          starTemplateLinks: state.templateDetails.starTemplateLinks.map(star =>
            star.id === action.star.id
              ? {
                  ...star,
                  templateOrder: action.star.templateOrder || 0,
                  role: action.star.role
                }
              : star
          )
        }
      };
    case templateConstants.TEMPLATE_UPDATE_STAR_FAILURE:
      return {
        ...state
      };
    case templateConstants.STAR_MERGE_SUCCESS:
      return {
        ...state,
        templateDetails: {
          ...state.templateDetails,
          starTemplateLinks: state.templateDetails.starTemplateLinks.map(star =>
            star.id === action.oldstar.id
              ? {
                  ...star,
                  starName: action.star.firstName + action.star.lastName,
                  starId: action.star.id,
                  addedBy: "admin",
                  verified: action.star.verified,
                  profileImageLocation: action.star.profileImageLocation
                }
              : star
          )
        }
      };

    case templateConstants.STAR_MERGE_FAILURE:
      return {
        ...state
      };
    case templateConstants.TEMPLATE_GALLERY_MODAL_OPEN:
      return {
        ...state,
        gallerymodal: action.gallerymodal,
        galleryMediaLink: action.mediaLink
      };
    case templateConstants.TEMPLATE_GALLERY_MODAL_CLOSE:
      return {
        ...state,
        gallerymodal: action.gallerymodal,
        galleryMediaLink: null
      };

    case templateConstants.TEMPLATE_STAR_UN_DELETE_SUCCESS:
      return {
        ...state,
        templateDetails: {
          ...state.templateDetails,
          starTemplateLinks: state.templateDetails.starTemplateLinks.map(star =>
            star.id === action.star.id
              ? { ...star, deletedFromTemplate: false }
              : star
          )
        }
      };
    case templateConstants.TEMPLATE_STAR_UN_DELETE_FAILURE:
      return {
        ...state
      };
    case templateConstants.TEMPLATE_GETEXTENAL_ID_SUCCESS:
      return {
        ...state,
        externalIds: action.ids
      };
    case templateConstants.TEMPLATE_GETEXTENAL_ID_FAILURE:
      return {
        ...state
      };
    case templateConstants.TEMPLATE_GET_TAGGED_STARS_SUCCESS:
      return {
        ...state,
        stars: {
          content: action.stars
        }
      };
    case templateConstants.TEMPLATE_GET_TAGGED_STARS_FAILURE:
      return {
        ...state,
        stars: {
          content: []
        }
      };
    case templateConstants.TEMPLATE_GET_CHILD_TEMPLATES_SUCCESS:
      return {
        ...state,
        childtemplates: action.templates
      };
    case templateConstants.TEMPLATE_GET_CHILD_TEMPLATES_FAILURE:
      return {
        ...state,
        childtemplates: []
      };
    case templateConstants.TEMPLATE_GROUPING_SUCCESS:
      return {
        ...state,
        childtemplates: [...[action.template], ...state.childtemplates]
      };
    case templateConstants.TEMPLATE_GROUPING_FAILURE:
      return {
        ...state
      };
    case templateConstants.TEMPLATE_DELETE_CHILD_TEMPLATES_SUCCESS:
      return {
        ...state,
        childtemplates: state.childtemplates.filter(
          template => template.id !== action.id
        )
      };
    case templateConstants.TEMPLATE_DELETE_CHILD_TEMPLATES_FAILURE:
      return {
        ...state
      };
    case templateConstants.TEMPLATE_GET_CAST_ROLES_SUCCESS:
      return {
        ...state,
        castroles: action.roles
      };
    case templateConstants.TEMPLATE_GET_CAST_ROLES_FAILURE:
      return {
        ...state,
        castroles: []
      };
    case templateConstants.TEMPLATE_GET_CREW_ROLES_SUCCESS:
      return {
        ...state,
        crewroles: action.roles
      };
    case templateConstants.TEMPLATE_GET_CREW_ROLES_FAILURE:
      return {
        ...state,
        crewroles: []
      };
    default:
      return state;
  }
}
