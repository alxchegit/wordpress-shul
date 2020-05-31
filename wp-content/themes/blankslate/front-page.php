<?php //-------------------------- ?>

<?php get_header( ) ?>
	
	<?php if ( have_posts() ) { while ( have_posts() ) { the_post(); ?>
	<!-- Цикл WordPress -->
	<!-- Вывод постов: the_title() и т.д. -->
	 <?php the_content( );  ?>
	<hr>
	<?php } } else { ?>
	<p>Записей нет.</p>
	<?php } ?>

<?php get_footer(  ) ?>

<?php //-------------------------- ?>