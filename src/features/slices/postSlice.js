import { createSlice } from "@reduxjs/toolkit";
import { addComment, CreatePost, deleteComment, DeletePost, GetFriendPost, GetMyPost, GetPost, toggleLike, updateComment} from "../actions/postAction";



export const postSlice = createSlice({
    name: "userSlice",
    initialState: {
        myposts: [],
        profilePosts: [],
        feed: [],
        loading: false,
        message: null,
        status: 0,

    },
    reducers: {

        clearPostMessage: (state) => {
            state.message = "";
            state.status = null;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(GetPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetPost.fulfilled, (state, action) => {
                state.loading = false;
                state.feed = action.payload.posts;

            })
            .addCase(GetPost.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.status = action.payload.status;
            })
            .addCase(GetMyPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetMyPost.fulfilled, (state, action) => {
                state.loading = false;
                state.myposts = action.payload.posts;

            })
            .addCase(GetMyPost.rejected, (state, action) => {
                state.loading = false;
                // state.message = action.payload.message;
                // state.status = action.payload.status;
            })
            .addCase(GetFriendPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetFriendPost.fulfilled, (state, action) => {
                state.loading = false;
                state.profilePosts = action.payload.posts;

            })
            .addCase(GetFriendPost.rejected, (state, action) => {
                state.loading = false;
                
                // state.message = action.payload.message;
                // state.status = action.payload.status;
            })
            .addCase(CreatePost.pending, (state) => {
                state.loading = true;
            })
            .addCase(CreatePost.fulfilled, (state, action) => {
                state.loading = false;
                action.payload.post.commentsCount=0
                action.payload.post.likesCount=0
                console.log(action.payload.post);
                
                state.myposts.unshift(action.payload.post);
                state.feed.unshift(action.payload.post);
                state.message = action.payload.message;
                state.status = action.payload.status;
            })
            .addCase(CreatePost.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.status = action.payload.status;
            })
            .addCase(DeletePost.pending, (state) => {
                state.loading = true;
            })
            .addCase(DeletePost.fulfilled, (state, action) => {
                state.loading = false;
                state.feed = state.feed.filter((post) => post._id !== action.payload.postId)
                state.myposts = state.myposts.filter((post) => post._id !== action.payload.postId)
                state.message = action.payload.message;
                state.status = action.payload.status;
            })
            .addCase(DeletePost.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.status = action.payload.status;
            })
            .addCase(addComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.loading = false;
console.log(action.payload.comment);

const pp = state.feed.find((p) => p._id === action.payload.postId)
// console.log(pp);
const addComm=(post)=>{
    
    if (post) {
        post.comments.unshift(action.payload.comment); // ✅ instant UI update
        post.commentsCount+=1
    }
}
                // if (mypost) {
                //     mypost.comments.unshift(action.payload.comment); // ✅ instant UI update
                //     mypost.commentsCount+=1
                // }
                addComm(state.feed.find((p) => p._id === action.payload.postId))
                addComm(state.myposts.find((p) => p._id === action.payload.postId))
                addComm(state.profilePosts.find((p) => p._id === action.payload.postId))

                state.message = action.payload.message;
                state.status = action.payload.status;
            })
            .addCase(addComment.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.status = action.payload.status;
            })
            .addCase(updateComment.pending, (state) => {
                state.loading = true;
            })
.addCase(updateComment.fulfilled, (state, action) => {
  state.loading = false;

  const { postId, commentId, comment, message, status } = action.payload;

  const updateInPost = (post) => {
    if (!post) return;
    const c = post.comments.find(c => c._id === commentId);
    if (c) c.text = comment;
  };

  updateInPost(state.feed.find(p => p._id === postId));
  updateInPost(state.myposts.find(p => p._id === postId));
  updateInPost(state.myposts.find(p => p._id === postId));

  state.message = message;
  state.status = status;
})

            .addCase(updateComment.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.status = action.payload.status;
            })
            .addCase(deleteComment.pending, (state) => {
                state.loading = true;
            })
.addCase(deleteComment.fulfilled, (state, action) => {
  state.loading = false;

  const { postId, commentId, message, status } = action.payload;

  // 🔹 Update in posts
  
  const deleteComm=(post)=>{
      
      if (post) {
          post.comments = post.comments.filter(
              comment => comment._id !== commentId
            );
            post.commentsCount-=1
        }
    }
    deleteComm( state.myposts.find(p => p._id === postId));
    deleteComm( state.feed.find(p => p._id === postId));
    deleteComm( state.profilePosts.find(p => p._id === postId));

  state.message = message;
  state.status = status;
})
            .addCase(deleteComment.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.status = action.payload.status;
            })
            .addCase(toggleLike.pending, (state) => {
                state.loading = true;
            })
            .addCase(toggleLike.fulfilled, (state, action) => {
                state.loading = false;
                const managelike=(post)=>{
                    
                    if (post) {
                        if (action.payload.message === "liked") {
                            post.likesCount += 1;
                        } else if (action.payload.message === "unliked") {
                            post.likesCount -= 1;
                        }
                    }
                }
                managelike(state.feed.find((p) => p._id === action.payload.postId))
                managelike(state.profilePosts.find((p) => p._id === action.payload.postId))
                managelike(state.myposts.find((p) => p._id === action.payload.postId))
            })
            .addCase(toggleLike.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.status = action.payload.status;
            })



    }
})

export const { clearPostMessage } = postSlice.actions;
export default postSlice.reducer;