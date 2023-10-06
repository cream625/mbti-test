import { useEffect } from "react";
import styles from "../App.module.css";
import { resultData } from "../constants/resultData";
import { useParams, Link } from "react-router-dom";


const ResultPage = () => {
  const { mbti } = useParams();

  const resultMBTIData = resultData.find((data) => data.mbti === mbti);

  const resultDesc = resultMBTIData.desc.split("\n");

  useEffect(() => {
    if(!Kakao.isInitialized()) {
        Kakao.init("9388c4ddefb150bf965706b3ec85dc51")
    }
  },[]);

  const clickShareHandler = () => {
    Kakao.Share.createCustomButton({
        container: '#kakaotalk-sharing-btn',
        templateId:99193,
        templateArgs: {
          THU: 'https://mbti-test-one.vercel.app' + resultMBTIData.image,
          MATCH_CAT: resultMBTIData.match_cat,
        },
      });
  }

  return (
    <div className={styles.layout}>
      <p className={styles.title_light}>나와 어울리는 고양이는?</p>
      <p className={styles.title_bold}>
        {resultMBTIData.match_cat} ({mbti})
      </p>
      <img className={styles.result_img} src={resultMBTIData.image} />

      {resultDesc.map((desc, index) => (
        <p key={index} className={styles.title_light}>
          {desc}
        </p>
      ))}


      <button onClick={clickShareHandler} className={styles.square_button}>카카오톡 공유하기</button>
      <Link to='/' className={styles.square_button}>다시해보기</Link>

    </div>
  );
};

export default ResultPage;
