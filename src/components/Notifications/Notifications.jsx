import React, { useEffect, useState } from "react";
import styles from "./Notifications.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckDouble } from "@fortawesome/free-solid-svg-icons";

const Notifications = ({
  isNotificationsOpen,
  notificationsMenuRef,
  userComments,
  shareComments,
  formatRelativeDate,
  getInitials,
  shareProductImgs,
  user,
  initialUsersList = [],
  handleNotificationClick,
}) => {
  const [usersList, setUsersList] = useState(initialUsersList);

  useEffect(() => {
    if (usersList.length === 0) {
      fetch("/db.json")
        .then((response) => response.json())
        .then((data) => {
          setUsersList(data.users || []);
          console.log("Fetched Users List:", data.users);
        })
        .catch((error) => console.error("Error fetching users:", error));
    }
  }, [usersList]);

  if (!isNotificationsOpen) return null;

  const sortedUserComments = [...userComments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const sortedShareComments = [...shareComments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const renderUserComments = () => {
    return sortedUserComments
      .filter((comment) => comment.creatorByEmail === user?.email)
      .map((comment) => {
        const likedUsers = comment.likedBy
          .filter((likeId) => likeId !== user?.id)
          .map((likeId) => {
            const likedUser = usersList.find((usr) => usr.id === likeId);
            return likedUser
              ? { fullname: likedUser.fullname, userImg: likedUser.userImg }
              : null;
          })
          .filter(Boolean);

        const dislikedUsers = comment.dislikedBy
          .filter((dislikeId) => dislikeId !== user?.id)
          .map((dislikeId) => {
            const dislikedUser = usersList.find((usr) => usr.id === dislikeId);
            return dislikedUser
              ? {
                  fullname: dislikedUser.fullname,
                  userImg: dislikedUser.userImg,
                }
              : null;
          })
          .filter(Boolean);

        return (
          <ul
            className={styles.notifications__like__dislike__lists}
            key={comment.id}
          >
            {likedUsers.length > 0 && (
              <li className={styles.notifications__liked__list}>
                {likedUsers.length < 3 ? (
                  <div className={styles.user__liked__by}>
                    {likedUsers.map((user) => (
                      <span
                        key={user.fullname}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          marginRight: "5px",
                          gap: "5px",
                        }}
                      >
                        {user.userImg ? (
                          <img
                            src={user.userImg}
                            alt={user.fullname}
                            className={styles.notifications__Picture}
                          />
                        ) : (
                          <span
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              backgroundColor: "#548AEA",
                              display: "inline-flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginRight: "5px",
                              color: "white",
                            }}
                          >
                            {getInitials(user.fullname)}
                          </span>
                        )}
                        <div className={styles.comment__sender__fullname}>
                          <span className={styles.notifications__fullname}>
                            {user.fullname}
                          </span>
                          <p>adlı istifadəçi rəyinizi bəyəndi</p>
                        </div>
                      </span>
                    ))}
                  </div>
                ) : (
                  `${likedUsers[0].fullname} və ${
                    likedUsers.length - 1
                  } digər istifadəçi "${comment.text}" rəyinizi bəyəndi`
                )}
                <div className={styles.comment__likedBy__text}>
                  {`"${comment.text}"`}
                </div>
              </li>
            )}

            {dislikedUsers.length > 0 && (
              <li className={styles.notifications__disliked__list}>
                {dislikedUsers.length < 3 ? (
                  <div className={styles.user__disliked__by}>
                    {dislikedUsers.map((user) => (
                      <span
                        key={user.fullname}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          marginRight: "5px",
                          gap: "5px",
                        }}
                      >
                        {user.userImg ? (
                          <img
                            src={user.userImg}
                            alt={user.fullname}
                            className={styles.notifications__Picture}
                          />
                        ) : (
                          <span
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              backgroundColor: "#548AEA",
                              display: "inline-flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginRight: "5px",
                              color: "white",
                            }}
                          >
                            {getInitials(user.fullname)}
                          </span>
                        )}
                        <div className={styles.comment__sender__fullname}>
                          <span className={styles.notifications__fullname}>
                            {user.fullname}
                          </span>
                          <p>adlı istifadəçi rəyinizi bəyənmədi</p>
                        </div>
                      </span>
                    ))}
                  </div>
                ) : (
                  `${dislikedUsers[0].fullname} və ${
                    dislikedUsers.length - 1
                  } digər istifadəçi "${comment.text}" rəyinizi bəyənmədi`
                )}
                <div className={styles.comment__dislikedBy__text}>
                  {`"${comment.text}"`}
                </div>
              </li>
            )}
          </ul>
        );
      });
  };

  return (
    isNotificationsOpen && (
      <div className={styles.notifications__menu} ref={notificationsMenuRef}>
        {sortedUserComments.length > 0 && renderUserComments()}

        {sortedShareComments.length > 0 ? (
          <ul className={styles.notifications__coming__comments__lists}>
            {sortedShareComments
              .filter((comment) => comment.creatorByEmail !== user?.email)
              .map((comment) => (
                <li
                  key={comment.id}
                  className={styles.notifications__shared__comment}
                  onClick={() => handleNotificationClick(comment.productId)}
                >
                  <div className={styles.comment__header}>
                    {comment.userImg ? (
                      <img
                        src={comment.userImg}
                        alt={comment.fullname}
                        className={styles.notifications__Picture}
                      />
                    ) : (
                      <span
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          backgroundColor: "#548AEA",
                          display: "inline-flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: "5px",
                          color: "white",
                        }}
                      >
                        {getInitials(comment.fullname)}
                      </span>
                    )}
                    <div>
                      <div className={styles.comment__sender__fullname}>
                        <span className={styles.notifications__fullname}>
                          {comment.fullname}
                        </span>
                        <p>adlı istifadəçi paylaşımınıza rəy bildirdi</p>
                      </div>
                      <span className={styles.comment__createdAt}>
                        {formatRelativeDate(comment.createdAt)}
                        <FontAwesomeIcon
                          icon={comment.read ? faCheckDouble : faCheck}
                          className={styles.readIcon}
                        />
                      </span>
                    </div>
                  </div>
                  <div className={styles.comment__body}>
                    {shareProductImgs.find(
                      (shareProductImg) =>
                        shareProductImg.id === comment.productId
                    ) && (
                      <img
                        src={
                          shareProductImgs.find(
                            (shareProductImg) =>
                              shareProductImg.id === comment.productId
                          ).image
                        }
                        alt="Product Image"
                        className={styles.product__image}
                      />
                    )}
                    <p>{`"${comment.text}"`}</p>
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          sortedUserComments.length === 0 && <p>Bildiriş yoxdur</p>
        )}
      </div>
    )
  );
};

export default Notifications;
