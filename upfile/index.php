<?php get_header(); ?>

  <div class="main parallax-container">
    <div class=main-massage>
      <div class="massage-inner">
        <?php // キャッチフレーズ ?>

        <h2><?php bloginfo('description'); ?></h2>

        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

          <?php // サブキャッチフレーズ（本文） ?>

          <?php the_content(); ?>

        <?php endwhile; endif; ?>
      </div>
      <a href="#first-view" id="scrollarrow"><p class="arrow-icon bounce"><i class="material-icons">arrow_downward</i></p></a>
    </div>
    <div class="movie parallax">
      <video id="Player" class="player" poster="/img/top/top.jpg" autoplay>
        <source type=video/mp4 src=/img/move/top_re.mp4>
        <p>動画を再生するには、videoタグをサポートしたブラウザが必要です。</p>
      </video>
    </div>
  </div>

<?php // お知らせ ?>

<?php
$query = new WP_Query(array(
  'post_status' => 'publish',
  'post_type' => 'information',
  'posts_per_page' => 3,
  'orderby' => 'date',
  'order' => 'DESC',
));
?>
<?php if ($query->have_posts()): ?>

  <section class=effect id="first-view">
    <div class="container container--flat">
        <h3 class="headline-gothic heading_Level3">
          NEWS
          <p class="heading_small">お知らせ</p>
        </h3>
          <div class="news-list">
              <?php while ($query->have_posts()) :
              $query->the_post(); ?>
                <dl class="news-list-item">
                  <dt class="news-list-date"><?php echo date("Y年m月d日", strtotime($post->post_date)); ?>
                  <dd class="news-list-text"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                </dl>
              <?php endwhile; ?>
          </div>
    </div>

    <div class="col center btn-area">
      <a href="/information/"
         class="waves-effect waves-light btn-large black base center">SEE ALL INFORMATION</a>
    </div>
  </section>

<?php endif; ?>

<?php // 制作事例 ?>

<?php
wp_reset_postdata();
$query = new WP_Query(array(
  'post_status' => 'publish',
  'post_type' => 'work',
  'posts_per_page' => 8,
  'orderby' => 'date',
  'order' => 'DESC',
));
?>
<?php if ($query->have_posts()): ?>

  <section class="effect bg-reration">
    <div class="container container--list">
      <h2 class=headline_Level1>WORKS<p class=heading_small>制作事例</h2>
      <div class=row>
        <?php while ($query->have_posts()): $query->the_post(); ?>

          <?php if (has_post_thumbnail()): ?>

            <?php
            $thumbnail_id = get_post_thumbnail_id();
            $video_html = "";
            $image = wp_get_attachment_image_src($thumbnail_id, 'large');
            $image_path = $image[0];

            // サブコピー
            $sub_copy = types_render_field('sub-copy');

            // YouTube
            $youtube_path = types_render_field('youtube', array("output" => "raw"));

            // 動画
            //$video_path = types_render_field('video', array("output" => "raw"));
            ?>

            <div class="col s6 m6 l3">
              <div class="container--list__item view-first">

                <?php if (!empty($youtube_path)): ?>

                  <?php // YouTube ?>

                  <img data-src="<?php echo $image_path; ?>" class="lazyload" alt="<?php the_title(); ?>">
                  <a href="#modal-<?php the_ID(); ?>" class="mask mask-video modal-trigger">
                    <h5><?php the_title(); ?></h5>
                    <p class="movie"><p class="movie-icon"></p></p>
                  </a>

                <?php else: ?>

                  <?php // 画像 ?>

                  <img data-src="<?php echo $image_path; ?>" class="lazyload" alt="<?php the_title(); ?>">
                  <a href="#modal-<?php the_ID(); ?>" class="mask modal-trigger">
                    <h5><?php the_title(); ?></h5>
                    <p><?php echo $sub_copy; ?></p>
                  </a>

                <?php endif; ?>

              </div>
            </div>

          <?php else: ?>

            <p style="color:red;font-size;12px;"><?php echo get_the_title() ?: "(タイトルなし)"; ?><br>※アイキャッチ画像未設定</p>

          <?php endif; ?>

        <?php endwhile; ?>
      </div>
    </div>

    <?php // モーダル ?>

    <?php while ($query->have_posts()): $query->the_post(); ?>

      <?php if (has_post_thumbnail()): ?>

        <?php
        $thumbnail_id = get_post_thumbnail_id();
        $video_html = "";
        $image = wp_get_attachment_image_src($thumbnail_id, 'large');
        $image_path = $image[0];

        // YouTube
        $youtube_path = types_render_field('youtube', array("output" => "raw"));

        // 画像
        $sub_image_paths = array();
        if ($_sub_image_paths = types_render_field('sub-image', array("url" => true, "size" => "large"))) {
          $sub_image_paths = explode(' ', $_sub_image_paths);
        }

        // 動画
        //$video_path = types_render_field('video', array("output" => "raw"));
        ?>

        <?php if (!empty($youtube_path)): ?>

          <?php // YouTube ?>

          <div id="modal-<?php the_ID(); ?>" class="modal" style="width: 500px;">
            <div class="modal-content">
              <h4 class="heading_Level4"><?php the_title(); ?></h4>
              <p><?php the_content(); ?></p>
              <div class="row">
                <div class="video-container">
                  <iframe width="500" height="480" src="<?php echo $youtube_path; ?>" frameborder="0"
                          allowfullscreen></iframe>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <a href="#!" class="modal-action modal-close waves-effect waves-red btn-flat">back</a>
            </div>
          </div>

        <?php else: ?>

          <?php // 画像 ?>

          <div id="modal-<?php the_ID(); ?>" class="modal" data-modal>
            <div class="modal-content">
              <h4 class="heading_Level4"><?php the_title(); ?></h4>
              <p><?php the_content(); ?></p>
              <div class="row image-container">
                <div class="col s12 l6 m6 center">
                  <div class="main-inner">
                    <img data-src="<?php echo $image_path; ?>" alt="<?php the_title(); ?>" data-main-image style="max-height:100%;" class="responsive-img lazyload">
                  </div>
                </div>
                <div class="col s12 l6 m6 center" data-change-main-image>
                  <a class="carousel-item" href="<?php echo $image_path; ?>">
                    <img data-src="<?php echo $image_path; ?>" class="responsive-img lazyload" alt="<?php the_title(); ?>">

                  </a>
                  <?php if (!empty($sub_image_paths)): ?>
                    <?php foreach ($sub_image_paths as $k => $sub_image_path): ?>
                      <a class="carousel-item" href="<?php echo $sub_image_path; ?>">
                        <img data-src="<?php echo $sub_image_path; ?>" class="responsive-img lazyload" alt="<?php echo get_the_title() . "-{$k}"; ?>">
                      </a>
                    <?php endforeach; ?>
                  <?php endif; ?>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <a href="#!" class="modal-action modal-close waves-effect waves-black btn-flat">back</a>
            </div>
          </div>

        <?php endif; ?>

      <?php else: ?>

        <?php // アイキャッチ画像が未設定の場合 ?>

        <div id="modal-<?php the_ID(); ?>" class="modal">
          <div class="modal-content">
            <h4><?php the_title(); ?></h4>
            <p><?php the_content(); ?></p>
            <div class="row image-container">※アイキャッチ画像未設定</div>
          </div>
        </div>

      <?php endif; ?>

    <?php endwhile; ?>

    <div class="col center btn-area">
      <a href="/work/" class="waves-effect waves-light btn-large black base center">SEE ALL WORKS</a>
    </div>
  </section>

<?php endif; ?>

<?php // サービス案内 ?>

<?php
$query = new WP_Query(array(
  'post_status' => 'publish',
  'post_type' => 'service',
  'tax_query' => array(
    array(
      'taxonomy' => 'service_type',
      'field' => 'slug',
      'terms' => array('main-press', 'print'),
      'operator'=>'NOT IN',
    ),
  ),
  'posts_per_page' => 4,
  'orderby' => 'date',
  'order' => 'DESC',
));
?>
<?php if ($query->have_posts()): ?>

 <section class="effect">
    <div class=container>
      <h2 class=headline_Level1>SERVICE<p class=heading_small>提供サービス</h2>
      <div class=row>
        <?php while ($query->have_posts()): $query->the_post(); ?>
          <?php
          $thumbnail_id = get_post_thumbnail_id();
          $eye_img = wp_get_attachment_image_src($thumbnail_id, 'large');
          $url = types_render_field('url', array('output' => 'raw'));
          if (!$url) {
            $url = get_the_permalink();
          }
          ?>

          <div class="col l3 s6 m6">
            <a href="<?php echo $url; ?>" class="link-box">
              <div class="card small">
                <div class="card-image waves-effect">
                   <img data-src="<?php echo $eye_img[0]; ?>" alt="<?php the_title(); ?>" class="lazyload">
                </div>
                <div class="card-content waves-effec">
                  <span class=card-title><?php the_title(); ?></span>
                  <p><?php echo mb_substr(get_the_content(), 0, 2); ?></p>
                </div>
              </div>
            </a>
          </div>
        <?php endwhile; ?>
      </div>
   </div>
      <div class="col center btn-area">
        <a href="/service/" class="waves-effect waves-light btn-large black base center">SEE ALL SERVICE</a>
      </div>
  </section>
<?php endif; ?>

<?php get_footer(); ?>





