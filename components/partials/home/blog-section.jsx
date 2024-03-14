import React from "react";
import Reveal from "react-awesome-reveal";

import OwlCarousel from "~/components/features/owl-carousel";

import PostSix from "~/components/features/post/post-six";

import { fadeIn, fadeInUpShorter } from "~/utils/data/keyframes";
import { mainSlider5 } from "~/utils/data/carousel";

function BlogSection(props) {
  const { posts } = props;

  return (
    <section className="blog container mt-10 pt-3 mb-10">
      <Reveal keyframes={fadeIn} duration={1000} triggerOnce>
        <span className="title title-underline title-line mb-4">Наш блог</span>

        <OwlCarousel adClass="owl-theme" options={mainSlider5}>
          {posts && posts.length
            ? posts.map((post, index) => (
                <React.Fragment key={"post-six" + index}>
                  <Reveal
                    keyframes={fadeInUpShorter}
                    duration={1000}
                    delay={index * 200 + 300}
                    triggerOnce
                  >
                    <PostSix
                      post={post}
                      adClass="overlay-zoom"
                      isCalender={true}
                      isAuthor={false}
                      btnAdClass="btn-sm"
                      btnText="Подробнее"
                      isOriginal={true}
                    />
                  </Reveal>
                </React.Fragment>
              ))
            : ""}
        </OwlCarousel>
      </Reveal>
    </section>
  );
}

export default React.memo(BlogSection);
