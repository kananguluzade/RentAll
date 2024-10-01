import React, { useState, useEffect, useContext, useRef } from "react";
import styles from "./Review.module.css";
import profilPicture from "../../../public/logo.png";
import { AuthContext } from "../Services/authContext";

const Review = ({ productId }) => {
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [openOptions, setOpenOptions] = useState({});
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(4);
  const { user } = useContext(AuthContext);

  const openOptionsRef = useRef(null);

  const handleOptions = (id) => {
    setOpenOptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDelete = (commentToDelete) => {
    fetch(`http://localhost:3000/comments/${commentToDelete.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setCommentsList((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentToDelete.id)
        );
      })
      .catch((error) => console.error("Error deleting comment:", error));
  };

  const formatRelativeDate = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} saniyə əvvəl`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} dəqiqə əvvəl`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} saat əvvəl`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} gün əvvəl`;
    }
  };

  const handleLike = (id) => {
    const currentComment = commentsList.find((comment) => comment.id === id);

    if (currentComment.likedByUser) {
      const updatedLikes = currentComment.likes - 1;
      fetch(`http://localhost:3000/comments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: updatedLikes,
          likedByUser: false,
        }),
      })
        .then((response) => response.json())
        .then((updatedComment) => {
          setCommentsList((prevComments) =>
            prevComments.map((comment) =>
              comment.id === id ? updatedComment : comment
            )
          );
        })
        .catch((error) => console.error("Error unliking comment:", error));
    } else {
      const updatedLikes = currentComment.likes + 1;
      const updatedDislikes = currentComment.dislikedByUser
        ? currentComment.dislikes - 1
        : currentComment.dislikes;

      fetch(`http://localhost:3000/comments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: updatedLikes,
          dislikes: updatedDislikes,
          likedByUser: true,
          dislikedByUser: false,
        }),
      })
        .then((response) => response.json())
        .then((updatedComment) => {
          setCommentsList((prevComments) =>
            prevComments.map((comment) =>
              comment.id === id ? updatedComment : comment
            )
          );
        })
        .catch((error) => console.error("Error liking comment:", error));
    }
  };

  const handleDislike = (id) => {
    const currentComment = commentsList.find((comment) => comment.id === id);

    if (currentComment.dislikedByUser) {
      const updatedDislikes = currentComment.dislikes - 1;
      fetch(`http://localhost:3000/comments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dislikes: updatedDislikes,
          dislikedByUser: false,
        }),
      })
        .then((response) => response.json())
        .then((updatedComment) => {
          setCommentsList((prevComments) =>
            prevComments.map((comment) =>
              comment.id === id ? updatedComment : comment
            )
          );
        })
        .catch((error) => console.error("Error undisliking comment:", error));
    } else {
      const updatedDislikes = currentComment.dislikes + 1;
      const updatedLikes = currentComment.likedByUser
        ? currentComment.likes - 1
        : currentComment.likes;

      fetch(`http://localhost:3000/comments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dislikes: updatedDislikes,
          likes: updatedLikes,
          dislikedByUser: true,
          likedByUser: false,
        }),
      })
        .then((response) => response.json())
        .then((updatedComment) => {
          setCommentsList((prevComments) =>
            prevComments.map((comment) =>
              comment.id === id ? updatedComment : comment
            )
          );
        })
        .catch((error) => console.error("Error disliking comment:", error));
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3000/comments?productId=${productId}`)
      .then((response) => response.json())
      .then((data) => setCommentsList(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [productId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openOptionsRef.current &&
        !openOptionsRef.current.contains(event.target)
      ) {
        setOpenOptions({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openOptionsRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        text: comment,
        productId,
        likes: 0,
        dislikes: 0,
        creatorByEmail: user.email,
        userName: user.username,
        userImg: user.profile_image,
        createdAt: new Date().toISOString(),
      };

      fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      })
        .then((response) => response.json())
        .then((data) => {
          setCommentsList([...commentsList, data]);
          setComment("");
        })
        .catch((error) => console.error("Error posting comment:", error));
    }
  };

  const loadMoreComments = () => {
    setVisibleCommentsCount((prevCount) => prevCount + 4);
  };

  const displayedComments = commentsList.slice(0, visibleCommentsCount);

  return (
    <div className={styles.comment__section}>
      <h3>Rəylər</h3>
      {user ? (
        <div className={styles.comment__maker}>
          <div className={styles.profile__picture}>
            <img src={user.profile_image} className={styles.comment__picture} alt="profile-pic" />
          </div>

          <div className={styles.text__write__line}>
            <form onSubmit={handleSubmit} className={styles.text__form}>
              <input
                type="text"
                placeholder="Rəy yaz..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button type="submit">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.9277 4.03187L4.71934 8.39921C3.78284 8.73414 3.58301 9.5 4.57217 10.0738L10.5927 13.0747C10.7532 13.1417 10.9539 13.3694 11.0074 13.49L14.0176 19.5185C14.5261 20.4027 15.5562 19.8936 15.6766 19.3846L20.0515 5.1572C20.2522 4.24622 19.4628 3.88452 18.9277 4.03187Z"
                    stroke="#252525"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <p className={styles.guest__user}>
          Burada yalniz isdifadəçilər yorumunu bildirə bilər!
        </p>
      )}
      <div className={styles.comments__list}>
        {displayedComments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <div className={styles.comment__upper}>
              <img
                src={comment.userImg}
                className={styles.profile__picture}
                alt="profil-pic"
              />
              <div className={styles.comment__username__options}>
                <div className={styles.comment__about}>
                  <h6>{comment.userName}</h6>
                  {formatRelativeDate(comment.createdAt)}
                </div>
                {user && (
                  <div className={styles.comment__option__menu}>
                    <button
                      className={styles.comment__option__btn}
                      onClick={() => handleOptions(comment.id)}
                    >
                      <svg
                        width="4"
                        height="16"
                        viewBox="0 0 4 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 2C1 1.2 1.66667 1 2 1C2.33333 1 3 1.2 3 2C3 2.8 2.33333 3 2 3C1.66667 3 1 2.8 1 2Z"
                          fill="#252525"
                        />
                        <path
                          d="M1 8C1 7.2 1.66667 7 2 7C2.33333 7 3 7.2 3 8C3 8.8 2.33333 9 2 9C1.66667 9 1 8.8 1 8Z"
                          fill="#252525"
                        />
                        <path
                          d="M1 14C1 13.2 1.66667 13 2 13C2.33333 13 3 13.2 3 14C3 14.8 2.33333 15 2 15C1.66667 15 1 14.8 1 14Z"
                          fill="#252525"
                        />
                      </svg>
                    </button>
                    {openOptions[comment.id] && (
                      <ul
                        className={styles.comment__options}
                        ref={openOptionsRef}
                      >
                        <li>Yararlı işarələ</li>
                        {comment.creatorByEmail !== user.email && (
                          <li>Şikayət et</li>
                        )}
                        {comment.creatorByEmail !== user.email && (
                          <li>Spam olaraq işarələ</li>
                        )}
                        {comment.creatorByEmail === user.email && (
                          <li
                            className={styles.comment__delete__btn}
                            onClick={() => handleDelete(comment)}
                          >
                            Sil
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.comment__text}>
              <p>{comment.text}</p>
              {user && (
                <div className={styles.comment__buttons}>
                  <div
                    className={`${styles.comment__like} ${
                      comment.likedByUser ? styles.active : ""
                    }`}
                  >
                    <svg
                      onClick={() => handleLike(comment.id)}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.85953 9.33707C6.69755 9.33707 5.98482 9.33707 4.42977 9.33707C2.87472 9.33707 2 10.309 2 11.2809V19.0562C2 20.6112 3.61984 21 4.42977 21H6.85953M6.85953 9.33707L12.205 3.50562C13.1769 2.53374 14.6348 3.01971 14.1488 4.47754L12.691 7.87923C12.529 8.36518 12.8854 9.33709 13.6629 9.33709C14.4404 9.33709 18.3604 9.33709 20.4662 9.33709C21.1142 9.33709 22.3128 9.72586 21.9241 11.2809L20.9522 15.1685L19.9803 19.0562C19.8183 19.7041 19.1056 21 17.5505 21H6.85953M6.85953 9.33707V21"
                        stroke="#252525"
                        strokeWidth="2"
                      />
                    </svg>
                    <span>{comment.likes}</span>
                  </div>
                  <div
                    className={`${styles.comment__dislike} ${
                      comment.dislikedByUser ? styles.active : ""
                    }`}
                  >
                    <svg
                      onClick={() => handleDislike(comment.id)}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.85953 9.33707C6.69755 9.33707 5.98482 9.33707 4.42977 9.33707C2.87472 9.33707 2 10.309 2 11.2809V19.0562C2 20.6112 3.61984 21 4.42977 21H6.85953M6.85953 9.33707L12.205 3.50562C13.1769 2.53374 14.6348 3.01971 14.1488 4.47754L12.691 7.87923C12.529 8.36518 12.8854 9.33709 13.6629 9.33709C14.4404 9.33709 18.3604 9.33709 20.4662 9.33709C21.1142 9.33709 22.3128 9.72586 21.9241 11.2809L20.9522 15.1685L19.9803 19.0562C19.8183 19.7041 19.1056 21 17.5505 21H6.85953M6.85953 9.33707V21"
                        stroke="#252525"
                        strokeWidth="2"
                      />
                    </svg>
                    <span>{comment.dislikes}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {commentsList.length > 4 && (
        <div className={styles.comment__load__more}>
          <button onClick={loadMoreComments}>Daha çox göstər</button>
        </div>
      )}
    </div>
  );
};

export default Review;
