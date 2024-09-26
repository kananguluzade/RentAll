import React, { useState, useEffect } from "react";
import styles from "./Review.module.css";
import profilPicture from "../../../public/logo.png";

const Review = ({ productId }) => {
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [openOptions, setOpenOptions] = useState({});
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(4);

  const handleOptions = (id) => {
    setOpenOptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/comments/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setCommentsList(commentsList.filter((comment) => comment.id !== id));
      })
      .catch((error) => console.error("Error deleting comment:", error));
  };
  useEffect(() => {
    fetch(`http://localhost:3000/comments?productId=${productId}`)
      .then((response) => response.json())
      .then((data) => setCommentsList(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = { text: comment, productId };

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
      <div className={styles.comment__maker}>
        <div className={styles.profile__picture}>
          <img src={profilPicture} alt="profile-pic" />
        </div>
        <div className={styles.text__write__line}>
          <form onSubmit={handleSubmit}>
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
      <div className={styles.comments__list}>
        {displayedComments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <div className={styles.comment__upper}>
              <img
                src={profilPicture}
                className={styles.profile__picture}
                alt="profil-pic"
              />
              <div className={styles.comment__username__options}>
                <div className={styles.comment__about}>
                  <h6>Kenan Quluzade</h6>
                  <span>3 gün əvvəl</span>
                </div>
                <div className={styles.comment__option__delete}>
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
                    <button
                      className={styles.comment__delete__btn}
                      onClick={() => handleDelete(comment.id)}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 10.5V16.5M10 16.5L10 10.5M4 6.00163H6M20 6.00163H18M18 6.00163V17.8044C18.0236 18.3097 18.0142 19.4366 17.7872 19.9014C17.5603 20.3661 17.1158 20.6807 16.922 20.7798C16.6619 20.8696 15.8752 21.0377 14.8085 20.9924H9.20567C8.6714 20.9924 7.50355 20.9499 7.10638 20.7798C6.70922 20.6098 6.34515 20.1234 6.21277 19.9014C6.13712 19.7597 5.98865 19.1419 6 17.8044V6.00163M18 6.00163H16M6 6.00163H8.01418M16 6.00163C16.0236 5.57184 16.0284 4.61874 15.8582 4.24468C15.6454 3.7771 15.078 3.28119 14.766 3.15367C14.4539 3.02615 13.5177 3.01198 13.0213 3.01198H10.9929C10.5626 2.98836 9.61135 2.98364 9.24823 3.15367C8.79433 3.3662 8.1844 3.9613 8.15603 4.24468C8.09456 4.47138 7.98014 5.14015 8.01418 6.00163M16 6.00163H8.01418"
                          stroke="#FAFAFA"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      Sil
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.comment__text}>
              <p>{comment.text}</p>
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
