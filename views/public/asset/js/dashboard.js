const makeDELETErequest = async(postId) => {
    console.log({postId: postId})
    let result = await $.ajax({
        url: `/post/${postId}`,
        type: 'DELETE',
    });

    if(typeof result != "undefined"){
        if(result.message == 'succes deleting the post'){
            alert(result.message);
            location.replace("/admin")
        }else{
            alert('deleting failed');
        }
    }
}