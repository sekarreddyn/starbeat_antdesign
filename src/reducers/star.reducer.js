import { starConstants } from "../constants";
const initialState = {
  star: {
    list: {
      content: [],
      first: true,
      last: true,
      number: 0,
      numberOfElements: 0,
      size: 0,
      sort: [],
      totalElements: 0,
      totalPages: 1,
      loading: null
    },
    star: {
      data: {
        id: "",
        starGroupingDTOs: [],
        categoryDTOs: [],
        bannerURL: "",
        profileUrl: "",
        videoChannels: []
      },
      loading: null
    },

    alias: {
      list: {
        data: [],
        loading: null
      },
      create: {
        loading: null
      },
      delete_alias: {
        loading: null,
        id: ""
      },
      update_alias: {
        loading: null
      }
    },
    categories: {
      list: {
        data: [],
        loading: null
      }
    },

    gallery: {
      list: {
        data: {
          content: [],
          first: true,
          last: true,
          number: 0,
          numberOfElements: 0,
          size: 0,
          sort: [],
          totalElements: 0,
          totalPages: 1,
          loading: true
        },
        loading: null
      },
      stars: {
        create: {
          loading: null
        },
        list: {
          data: [],
          loading: null
        },
        delete: {
          loading: null
        }
      },
      create: {
        loading: null
      },
      gallery_delete: {
        loading: false
      }
    },

    external_ids: {
      list: {
        data: {},
        loading: null
      },
      create: {
        loading: null
      }
    },
    movies: {
      list: {
        data: [],
        loading: null
      }
    },
    videos: {
      list: {
        data: {
          content: [],
          first: true,
          last: true,
          number: 0,
          numberOfElements: 0,
          size: 0,
          sort: [],
          totalElements: 0,
          totalPages: 1,
          loading: true
        },
        loading: null
      },
      types: {
        data: [],
        loading: null
      },
      create: {
        loading: null
      },
      insta_get: {
        loading: null
      },
      tiktok_get: {
        loading: null
      },
      video_delete: {
        loading: null
      }
    },
    channels: {
      create: {
        loading: null
      },
      channel_delete: {
        loading: null
      }
    },
    news: {
      list: {
        data: {
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
        loading: null
      }
    },
    grouping: {
      create: {
        loading: null
      },
      delete_group: {
        id: "",
        loading: null
      }
    }
  }
};

export function star(state = initialState, action) {
  switch (action.type) {
    case starConstants.STARS_GETALL_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          list: {
            content: [],
            first: true,
            last: true,
            number: 0,
            numberOfElements: 0,
            size: 0,
            sort: [],
            totalElements: 0,
            totalPages: 1,
            loading: true
          }
        }
      };
    case starConstants.STARS_GETALL_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          list: {
            ...action.stars,
            loading: false
          }
        },
        stars: action.stars,
        url: action.url
      };
    case starConstants.STARS_GETALL_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          list: {
            ...state.star.list,
            loading: false
          }
        }
      };
    case starConstants.STAR_DELETE_REQUEST:
      return {
        star: {
          ...state.star,
          list: {
            ...state.star.list,
            loading: true
          }
        }
      };
    case starConstants.STAR_DELETE_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          list: {
            ...state.star.list,
            content: state.star.list.content.filter(
              star => star.id !== action.star.id
            ),
            totalElements: state.star.list.totalElements - 1,
            loading: false
          }
        }
      };
    case starConstants.STAR_DELETE_FAILURE:
      return {
        ...state
      };
    case starConstants.STAR_GET_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            ...state.star.star,
            loading: true
          }
        }
      };
    case starConstants.STAR_GET_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            data: action.starDetails,
            loading: false
          }
        },
        starDetails: action.starDetails
      };
    case starConstants.STAR_GET_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            ...state.star.star,
            loading: false
          }
        }
      };
    case starConstants.STAR_CATEGORIES_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          categories: {
            ...state.star.categories,
            list: {
              ...state.star.categories.list,
              loading: true
            }
          }
        },
        categoryList: action.categoryList,
        categoryLoading: false
      };
    case starConstants.STAR_CATEGORIES_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          categories: {
            ...state.star.categories,
            list: { data: action.categoryList, loading: false }
          }
        },
        categoryList: action.categoryList,
        categoryLoading: false
      };

    case starConstants.STAR_CATEGORIES_FAILURE:
      return {
        ...state,
        categoryList: {},
        categoryLoading: false
      };
    case starConstants.STAR_ADD_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            ...state.star.star,
            loading: true
          }
        }
      };
    case starConstants.STAR_ADD_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            data: action.star,
            loading: false
          }
        }
      };
    case starConstants.STAR_ADD_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            ...state.star.star,
            loading: false
          }
        }
      };
    case starConstants.STAR_UPDATEPROFILE_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            ...state.star.star,
            loading: true
          }
        }
      };
    case starConstants.STAR_UPDATEPROFILE_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            data: action.star,
            loading: false
          }
        }
      };
    case starConstants.STAR_UPDATEPROFILE_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            ...state.star.star,
            loading: false
          }
        }
      };
    case starConstants.STAR_GETGALLERY_REQUEST:
      return {
        ...state,

        star: {
          ...state.star,
          gallery: {
            ...state.star.gallery,
            list: {
              ...state.star.gallery.list,
              loading: true
            }
          }
        },
        isGalleryLoaded: true
      };
    case starConstants.STAR_GETGALLERY_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          gallery: {
            ...state.star.gallery,
            list: {
              ...state.star.gallery.list,
              data: {
                ...state.star.gallery.list.data,
                ...action.gallery,
                content: action.gallery.content.map(gallery => ({
                  ...gallery,
                  isChecked: false
                }))
              },
              loading: false
            }
          }
        },
        isGalleryLoaded: true
      };
    case starConstants.STAR_GETGALLERY_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          gallery: {
            ...state.star.gallery,
            list: {
              ...state.star.gallery.list,
              loading: false
            }
          }
        }
      };
    case starConstants.STAR_GETMOVIES_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          movies: {
            ...state.star.movies,
            list: {
              ...state.star.movies.list,
              loading: true
            }
          }
        }
      };
    case starConstants.STAR_GETMOVIES_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          movies: {
            ...state.star.movies,
            list: {
              ...state.star.movies.list,
              data: action.movies,
              loading: false
            }
          }
        }
      };
    case starConstants.STAR_GETMOVIES_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          movies: {
            ...state.star.movies,
            list: {
              ...state.star.movies.list,
              loading: false
            }
          }
        }
      };
    case starConstants.STAR_UPLOAD_PROFILE_IMAGE_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            ...state.star.star,
            loading: true
          }
        }
      };
    case starConstants.STAR_UPLOAD_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            ...state.star.star,
            data: {
              ...state.star.star.data,
              profileUrl: action.profileUrl + new Date().getTime()
            },
            loading: false
          }
        }
      };
    case starConstants.STAR_UPLOAD_PROFILE_IMAGE_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            ...state.star.star,
            loading: false
          }
        }
      };
    case starConstants.STAR_UPLOAD_BANNER_IMAGE_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            ...state.star.star,
            loading: true
          }
        }
      };
    case starConstants.STAR_UPLOAD_BANNER_IMAGE_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            ...state.star.star,
            data: {
              ...state.star.star.data,
              bannerURL: action.bannerURL + new Date().getTime()
            },
            loading: false
          }
        }
      };
    case starConstants.STAR_UPLOAD_BANNER_IMAGE_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            ...state.star.star,
            loading: false
          }
        }
      };
    case starConstants.STAR_DELETE_PROFILE_IMAGE_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            ...state.star.star,
            loading: true
          }
        }
      };
    case starConstants.STAR_DELETE_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            data: action.starDetails,
            loading: false
          }
        },
        starDetails: action.starDetails
      };
    case starConstants.STAR_DELETE_PROFILE_IMAGE_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            ...state.star.star,
            loading: false
          }
        }
      };
    case starConstants.STAR_DELETE_BANNER_IMAGE_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            ...state.star.star,
            loading: true
          }
        }
      };
    case starConstants.STAR_DELETE_BANNER_IMAGE_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            data: action.starDetails,
            loading: false
          }
        }
      };
    case starConstants.STAR_DELETE_BANNER_IMAGE_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            ...state.star.star,
            loading: false
          }
        }
      };
    case starConstants.STAR_DELETE_GALLERY_IMAGE_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          gallery: {
            ...state.star.gallery,
            gallery_delete: {
              loading: true
            }
          }
        }
      };
    case starConstants.STAR_DELETE_GALLERY_IMAGE_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          gallery: {
            ...state.star.gallery,
            list: {
              ...state.star.gallery.list,
              data: {
                ...state.star.gallery.list.data,
                content: state.star.gallery.list.data.content.filter(
                  gallery => gallery.id !== action.img
                ),
                numberOfElements:
                  state.star.gallery.list.data.numberOfElements - 1,
                size: state.star.gallery.list.data.size - 1,
                totalElements: state.star.gallery.list.data.totalElements - 1
              }
            },
            gallery_delete: {
              loading: false
            }
          }
        }
      };
    case starConstants.STAR_DELETE_GALLERY_IMAGE_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          gallery: {
            ...state.star.gallery,
            gallery_delete: {
              loading: false
            }
          }
        }
      };
    case starConstants.STAR_GET_TAGGED_STARS_SUCCESS:
      return {
        ...state,
        stars: {
          content: action.stars
        }
      };
    case starConstants.STAR_DELETE_TAGGED_STARS_SUCCESS:
      return {
        ...state,
        stars: {
          content: state.stars.content.filter(
            star => star.id !== action.star.id
          )
        }
      };
    case starConstants.STAR_DELETE_VIDEO_CHANNEL_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          channels: {
            ...state.star.channels,
            create: {
              loading: null
            },
            channel_delete: {
              loading: true
            }
          }
        }
      };
    case starConstants.STAR_DELETE_VIDEO_CHANNEL_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            data: action.star
          },
          channels: {
            ...state.star.channels,
            channel_delete: {
              loading: false
            }
          }
        }
      };

    case starConstants.STAR_DELETE_VIDEO_CHANNEL_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          channels: {
            ...state.star.channels,
            channel_delete: {
              loading: false
            }
          }
        }
      };
    case starConstants.STAR_ADD_VIDEO_CHANNEL_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          channels: {
            ...state.star.channels,
            create: {
              loading: true
            }
          }
        }
      };
    case starConstants.STAR_ADD_VIDEO_CHANNEL_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            data: action.star
          },
          channels: {
            ...state.star.channels,
            create: {
              loading: false
            }
          }
        }
      };
    case starConstants.STAR_ADD_VIDEO_CHANNEL_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          channels: {
            ...state.star.channels,
            create: {
              loading: false
            }
          }
        }
      };
    case starConstants.STAR_UPLOAD_GALLERY_IMAGE_REQUEST:
      return {
        ...state
      };
    case starConstants.STAR_UPLOAD_GALLERY_IMAGE_SUCCESS:
      return {
        ...state,
        starDetails: {
          ...state.starDetails,
          loading: false
        }
      };
    case starConstants.STAR_UPLOAD_GALLERY_IMAGE_FAILURE:
      return {
        ...state,
        starDetails: {
          ...state.starDetails,
          loading: false
        }
      };
    case starConstants.STAR_VERIFY_REQUEST:
      return {
        ...state
      };
    case starConstants.STAR_VERIFY_SUCCESS:
      return {
        ...state,
        starDetails: {
          ...state.starDetails,
          verified: action.star.verified,
          status: action.star.status
        }
      };

    case starConstants.STAR_VERIFY_FAILURE:
      return {
        ...state
      };
    case starConstants.STAR_MARKFORDELETE_SUCCESS:
      return {
        ...state,
        starDetails: {
          ...state.starDetails,
          markForDelete: action.markForDelete
        }
      };

    case starConstants.STAR_MARKFORDELETE_FAILURE:
      return {
        ...state
      };
    case starConstants.STAR_MARKFORUNDELETE_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          list: {
            ...state.star.list,
            loading: true
          }
        },
        starDetails: {
          ...state.starDetails,
          markForDelete: action.markForDelete
        }
      };
    case starConstants.STAR_MARKFORUNDELETE_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          list: {
            ...state.star.list,
            content: state.star.list.content.filter(
              star => star.id !== action.starId
            ),
            totalElements: state.star.list.totalElements - 1,
            loading: false
          }
        },
        starDetails: {
          ...state.starDetails,
          markForDelete: action.markForDelete
        }
      };

    case starConstants.STAR_MARKFORUNDELETE_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          list: {
            ...state.star.list,
            loading: false
          }
        }
      };
    case starConstants.STAR_DOWNLOAD_IMAGE_FROM_URL_REQUEST:
      return {
        ...state
      };
    case starConstants.STAR_DOWNLOAD_IMAGE_FROM_URL_SUCCESS:
      return {
        ...state,
        imageBase64: {
          image: action.image,
          time: +new Date().getTime(),
          loading: false
        }
      };
    case starConstants.STAR_DOWNLOAD_IMAGE_FROM_URL_FAILURE:
      return {
        ...state,
        imageBase64: {
          ...state.imageBase64,
          loading: false
        }
      };

    case starConstants.STAR_GALLERY_MODAL_OPEN:
      return {
        ...state,
        gallerymodal: action.gallerymodal,
        galleryMediaLink: action.mediaLink
      };
    case starConstants.STAR_GALLERY_MODAL_CLOSE:
      return {
        ...state,
        gallerymodal: action.gallerymodal,
        galleryMediaLink: null
      };
    case starConstants.STAR_TAG_MODAL_CLOSE:
      return {
        ...state,
        stars: {
          content: action.stars
        }
      };
    case starConstants.STAR_GROUP_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            ...state.star.star,
            data: {
              ...state.star.star.data,
              ...action.star
            },
            loading: false
          }
        }
      };
    case starConstants.STAR_GROUP_FAILURE:
      return {
        ...state
      };
    case starConstants.STAR_GROUPED_DELETE_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          grouping: {
            ...state.star.grouping,
            delete_group: {
              id: action.id,
              loading: true
            }
          }
        }
      };
    case starConstants.STAR_GROUPED_DELETE_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          star: {
            ...state.star.star,
            data: {
              ...state.star.star.data,
              starGroupingDTOs: state.star.star.data.starGroupingDTOs.filter(
                star => star.starCompacttDTO.id !== action.id
              )
            }
          },
          grouping: {
            ...state.star.grouping,
            delete_group: {
              ...state.star.grouping.delete_group,
              loading: false
            }
          }
        }
      };
    case starConstants.STAR_GROUPED_DELETE_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          grouping: {
            ...state.star.grouping,
            delete_group: {
              ...state.star.grouping.delete_group,
              loading: false
            }
          }
        }
      };

    case starConstants.STARS_GETALL_BYSEARCH_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          list: {
            content: [],
            first: true,
            last: true,
            number: 0,
            numberOfElements: 0,
            size: 0,
            sort: [],
            totalElements: 0,
            totalPages: 1,
            loading: true
          }
        }
      };
    case starConstants.STARS_GETALL_BYSEARCH_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          list: {
            ...action.stars,
            loading: false
          }
        },
        stars: action.stars,
        url: action.url,
        pageable: action.pageable,
        isAddEnabled: false
      };
    case starConstants.STARS_GETALL_BYSEARCH_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          list: {
            ...state.star.list,
            loading: true
          }
        }
      };
    case starConstants.STAR_SAVE_AND_GO:
      return {
        ...state,
        isAddEnabled: action.isEnabled
      };
    case starConstants.STAR_GETEXTENAL_ID_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          external_ids: {
            ...state.star.external_ids,
            list: {
              ...state.star.external_ids.list,
              loading: true
            }
          }
        }
      };
    case starConstants.STAR_GETEXTENAL_ID_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          external_ids: {
            ...state.star.external_ids,
            list: {
              ...state.star.external_ids.list,
              data: action.ids,
              loading: false
            }
          }
        }
      };
    case starConstants.STAR_GETEXTENAL_ID_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          external_ids: {
            ...state.star.external_ids,
            list: {
              ...state.star.external_ids.list,
              loading: false
            }
          }
        }
      };
    case starConstants.STAR_GET_NEWS_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          news: {
            ...state.star.news,
            list: {
              ...state.star.news.list,
              loading: true
            }
          }
        }
      };
    case starConstants.STAR_GET_NEWS_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          news: {
            ...state.star.news,
            list: {
              ...state.star.news.list,
              data: { ...action.news },
              loading: false
            }
          }
        }
      };
    case starConstants.STAR_GET_NEWS_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          news: {
            ...state.star.news.list,
            loading: false
          }
        }
      };
    case starConstants.STAR_ADD_VIDEO_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          videos: {
            ...state.star.videos,
            create: {
              loading: true
            },
            tiktok_get: {
              loading: false
            },
            insta_get: {
              loading: false
            }
          }
        }
      };
    case starConstants.STAR_ADD_VIDEO_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          videos: {
            ...state.star.videos,
            list: {
              ...state.star.videos.list,
              data: {
                ...state.star.videos.list.data,
                content: state.star.videos.list.data.content.concat(
                  action.video
                )
              }
            },
            create: {
              loading: false
            }
          }
        }
      };

    case starConstants.STAR_ADD_VIDEO_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          videos: {
            ...state.star.videos,
            create: {
              loading: false
            }
          }
        }
      };
    case starConstants.STAR_GET_VIDEOS_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          videos: {
            ...state.star.videos,
            list: {
              ...state.star.videos.list,
              loading: true
            }
          }
        }
      };
    case starConstants.STAR_GET_VIDEOS_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          videos: {
            ...state.star.videos,
            list: {
              ...state.star.videos.list,
              data: { ...action.videos },
              loading: false
            }
          }
        },

        isVideosLoaded: true
      };
    case starConstants.STAR_GET_VIDEOS_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          videos: {
            ...state.star.videos,
            list: {
              ...state.star.videos.list,
              loading: false
            }
          }
        }
      };
    case starConstants.STAR_DELETE_VIDEO_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          videos: {
            ...state.star.videos,
            video_delete: {
              loading: true
            }
          }
        }
      };
    case starConstants.STAR_DELETE_VIDEO_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          videos: {
            ...state.star.videos,
            list: {
              ...state.star.videos.list,
              data: {
                ...state.star.videos.list.data,
                content: state.star.videos.list.data.content.filter(
                  video => video.id !== action.id
                ),
                numberOfElements:
                  state.star.videos.list.data.numberOfElements - 1,
                size: state.star.videos.list.data.size - 1,
                totalElements: state.star.videos.list.data.totalElements - 1
              }
            },
            video_delete: {
              loading: false
            }
          }
        }
      };
    case starConstants.STAR_DELETE_VIDEO_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          videos: {
            ...state.star.videos,
            video_delete: {
              loading: true
            }
          }
        }
      };
    case starConstants.STAR_DELETE_VIDEO_FAILURE:
      return {
        ...state
      };
    case starConstants.VIDEO_GET_TAGGED_STARS_SUCCESS:
      return {
        ...state,
        stars: {
          content: action.stars
        }
      };
    case starConstants.VIDEO_GET_TAGGED_STARS_FAILURE:
      return {
        ...state,
        stars: {
          content: []
        }
      };
    case starConstants.REMOVE_STARS_FROM_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: {
          content: state.videos.content.filter(video => video.id !== action.id)
        }
      };
    case starConstants.REMOVE_STARS_FROM_VIDEOS_FAILURE:
      return {
        ...state
      };
    case starConstants.STAR_SEARCH_BY_ID_REQUEST:
      return {
        ...state
      };
    case starConstants.STAR_SEARCH_BY_ID_SUCCESS:
      return {
        ...state,
        stars: {
          content: [action.star]
        }
      };
    case starConstants.STAR_SEARCH_BY_ID_FAILURE:
      return {
        ...state,
        stars: {
          content: []
        }
      };
    case starConstants.STAR_ADD_EXTERNALID_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          external_ids: {
            ...state.star.external_ids,
            create: { loading: true }
          }
        }
      };
    case starConstants.STAR_ADD_EXTERNALID_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          external_ids: {
            ...state.star.external_ids,
            list: {
              ...state.star.external_ids.list,
              data: {
                ...action.externalId,
                ...state.star.external_ids.list.data
              }
            },
            create: { loading: false }
          }
        }
      };

    case starConstants.STAR_ADD_EXTERNALID_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          external_ids: {
            ...state.star.external_ids,
            create: { loading: false }
          }
        }
      };
    case starConstants.STAR_GET_TIKTOK_MEDIA_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          videos: {
            ...state.star.videos,
            tiktok_get: {
              loading: true
            }
          }
        }
      };
    case starConstants.STAR_GET_TIKTOK_MEDIA_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          videos: {
            ...state.star.videos,
            tiktok_get: {
              loading: false
            }
          }
        }
      };
    case starConstants.STAR_GET_TIKTOK_MEDIA_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          videos: {
            ...state.star.videos,
            tiktok_get: {
              loading: false
            }
          }
        }
      };
    case starConstants.STAR_GET_INSTAGRAM_MEDIA_REQUEST:
      return {
        ...state,
        star: {
          ...state.star,
          videos: {
            ...state.star.videos,
            insta_get: {
              loading: true
            }
          }
        }
      };
    case starConstants.STAR_GET_INSTAGRAM_MEDIA_SUCCESS:
      return {
        ...state,
        star: {
          ...state.star,
          videos: {
            ...state.star.videos,
            insta_get: {
              loading: false
            }
          }
        }
      };
    case starConstants.STAR_GET_INSTAGRAM_MEDIA_FAILURE:
      return {
        ...state,
        star: {
          ...state.star,
          videos: {
            ...state.star.videos,
            insta_get: {
              loading: false
            }
          }
        }
      };

    default:
      return state;
  }
}
