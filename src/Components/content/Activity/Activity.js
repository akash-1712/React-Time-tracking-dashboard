import React, { useEffect, useState, useRef } from "react";
import styles from "./_activity.module.scss";
import work from "../../../images/icon-work.svg";
import dotes from "../../../images/icon-ellipsis.svg";
import { useSelector } from "react-redux";

const Activity = (props) => {
  const activity = useSelector((state) => state.activity);
  const selectedActivity = `${
    activity.daily ? "daily" : activity.weekly ? "weekly" : "monthly"
  }`;
  const { title, timeframes } = props.data;
  const [dropBar, setDropBar] = useState(false);
  const classes = `${props.className} ${styles.activity}`;
  const dropClasses = `${styles.dropBar} ${
    dropBar ? styles.active : styles.hidden
  }`;

  const dropBarHandler = () => {
    setDropBar(!dropBar);
  };
  return (
    <section className={classes}>
      <div
        style={{ backgroundColor: `${props.color ? props.color : "#F94C66"}` }}
        className={styles.top}
      >
        <div className={styles.div_img}>
          <img
            src={require(`../../../images/icon-${props.svg}.svg`)}
            alt="svg"
          />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottom_top}>
          <h2>{title}</h2>
          <div
            onClick={dropBarHandler}
            // onBlur={dropBarHandler}
            className={styles.img_div}
          >
            <img src={dotes} alt="dotes" />
            <div className={dropClasses}>
              <ul className={styles.dropBar_list}>
                <li>Edit</li>
                <li>Delete</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.bottom_bottom}>
          <h1>{timeframes[`${selectedActivity}`]?.current}hrs</h1>
          <p>
            Last {`${selectedActivity}`}-
            {timeframes[`${selectedActivity}`].previous}hrs
          </p>
        </div>
      </div>
    </section>
  );
};

export default Activity;
