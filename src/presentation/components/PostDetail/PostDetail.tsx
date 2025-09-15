import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { selectPosts } from "../../../store/postsSlice";
import { selectUser } from "../../../store/userSlice";
import { CommentForm } from "../CommentForm/CommentForm";
import { PostElement } from "../PostList/PostElement";
import { useEffect, useState } from "react";
import { PostRepositoryImpl } from "../../../data/repositories/PostRepository";
import { FetchPostDetailUseCase } from "../../../domain/usecase/FetchPostDetailUseCase";
import { AppDispatch } from "../../../store/store";
import { PostDetailPresenter, PostDetailViewModel } from "../../presenters/PostDetailPresenter";

export const PostDetail = () => {
  const dispatch = useDispatch<AppDispatch>();  
  const params = useParams();
  const postId: number = typeof(params?.postId) === "string" ? Number(params.postId) : 0;
  const users = useSelector(selectUser).users;
  const { loading, error } = useSelector(selectPosts);
  const postRepository = new PostRepositoryImpl(dispatch);
  const fetchPostByIdUseCase = new FetchPostDetailUseCase(postRepository);
  const presenter = new PostDetailPresenter();
  const [viewModel, setViewModel] = useState<PostDetailViewModel>({
    post: {
      id: 0,
      content: '',
      likes: 0,
      userId: 0
    },
    userName: '',
    isCommentDisplayed: true,
  });
  useEffect(() => {
      if (postId > 0) {
        fetchPostByIdUseCase
          .execute(postId)
          .then((post) => {
            setViewModel(presenter.toViewModel(post, users));
          })
          .catch((err) => console.error(err));
      }
  }, [postId]);  
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!viewModel.post) return <p>投稿が見つかりません</p>;
  return (
    <div>
      <PostElement post={viewModel.post} userName={viewModel.userName} isCommentDisp={viewModel.isCommentDisplayed}  />
      <CommentForm />
    </div>
  );
}