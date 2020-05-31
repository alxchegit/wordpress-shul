<?php get_header(); ?>
<main id="content" class="page_php">
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
<header class="header">
<h1 class="entry-title"><?php the_title(); ?></h1> 
</header>
<div class="entry-content">
 
<?php the_content(); ?>
 
</div>
</article>
 
<?php endwhile; endif; ?>
</main>
<?php get_sidebar(); ?>
<?php get_footer(); ?>