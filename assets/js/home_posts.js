{
    
    console.log('loaded')
    //create a post using ajax
    let createPost = function(req,res){
        let newPostForm = $('#post-form');
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:function(data){
                     let newPost = newPostDom(data.data.post);
                    $('#show-posts-container > ul ').prepend(newPost);
                    deletePost($(' .delete-post-btn', newPost));                },
                error:function(error){
                    console.log(error.responseText);
                }
            })
        }); 
    }
    // display a post in dom using ajax

    let newPostDom = function(post){
        return $(`
             
                <li id="post-${post._id}">
                 
                <small>
                    <a class="delete-post-btn" href="/posts/destroy/${post._id} ">Delete</a>
                </small>
            
                <p>${post.content}</p> 
                <p>${post.user.name}</p>
                <div class="post-comments-container">
                
                    <form action="/comments/create" method="POST">
                        <input type="text" name="content" id="comments-content">
                        <input type="hidden" name="post" value=" ${post._id}"> 
                        <input type="submit" value="Post comment">
                    </form>    
                 
                </div>
                <div class="post-comments-list">
                    <ul id="post-comments-${post._id}">
                     </ul>
                </div>
            </li>
            

        `)
    }


    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                     $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
    createPost();


}