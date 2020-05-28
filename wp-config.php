<?php
/**
 * Основные параметры WordPress.
 *
 * Скрипт для создания wp-config.php использует этот файл в процессе
 * установки. Необязательно использовать веб-интерфейс, можно
 * скопировать файл в "wp-config.php" и заполнить значения вручную.
 *
 * Этот файл содержит следующие параметры:
 *
 * * Настройки MySQL
 * * Секретные ключи
 * * Префикс таблиц базы данных
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** Параметры MySQL: Эту информацию можно получить у вашего хостинг-провайдера ** //
/** Имя базы данных для WordPress */
define( 'DB_NAME', 'shulepovbd' );

/** Имя пользователя MySQL */
define( 'DB_USER', 'admin' );

/** Пароль к базе данных MySQL */
define( 'DB_PASSWORD', 'root' );

/** Имя сервера MySQL */
define( 'DB_HOST', '10.15.3.2' );

/** Кодировка базы данных для создания таблиц. */
define( 'DB_CHARSET', 'utf8mb4' );

/** Схема сопоставления. Не меняйте, если не уверены. */
define( 'DB_COLLATE', '' );

/**#@+
 * Уникальные ключи и соли для аутентификации.
 *
 * Смените значение каждой константы на уникальную фразу.
 * Можно сгенерировать их с помощью {@link https://api.wordpress.org/secret-key/1.1/salt/ сервиса ключей на WordPress.org}
 * Можно изменить их, чтобы сделать существующие файлы cookies недействительными. Пользователям потребуется авторизоваться снова.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'dL<^1]CTP`_{p2Z1gm5{q5a~F#m$i9:q@Kt-y6wgD-$NIVDbkKmjjIYpUHl64f!E' );
define( 'SECURE_AUTH_KEY',  '*;PN@^C|Q^608J=Z^@m2YvwF184$.Yr}k/n#sD)r6+^Wh=n|=/Yu?T.8.$w# hR-' );
define( 'LOGGED_IN_KEY',    'KgU+M(+@=_W}v.Jw:0>|N1B*Af9m{H*NtbL29;+.I/8kQ$QoUu{d4(3|K7CBDV4q' );
define( 'NONCE_KEY',        'LF?^L!DBPu?yA9cJ]s5vKQ)9:kqRBO/^/36hxz,Hl[/S:z*S%Le!IZAwc6g:8,6L' );
define( 'AUTH_SALT',        'xiwjUm&42hcr4;hY(r6uOV.|l+w$>nJE|ktX5P4m#-!Kz]Q&3PG#UCQ6io,%t>f*' );
define( 'SECURE_AUTH_SALT', 'J2;k?I9E+gp5o[9qy4ws@bas2D)=FzZO^`zG+?#ro}C,:JlC#6&?=RND@u`/CW U' );
define( 'LOGGED_IN_SALT',   'ps]33,*RHxpl_ Z)ydwy^O!0g)DXedb*99[31BJ:UC2.{Dq9PlBf9|dztB HIhpp' );
define( 'NONCE_SALT',       '}@l/*Dmzv4.xx4;JZzhy1mdp1fL}NS0f6}*p|cNBmsOYP+%TIC/`(ulo&*9&(mLY' );

/**#@-*/

/**
 * Префикс таблиц в базе данных WordPress.
 *
 * Можно установить несколько сайтов в одну базу данных, если использовать
 * разные префиксы. Пожалуйста, указывайте только цифры, буквы и знак подчеркивания.
 */
$table_prefix = 'wp_';

/**
 * Для разработчиков: Режим отладки WordPress.
 *
 * Измените это значение на true, чтобы включить отображение уведомлений при разработке.
 * Разработчикам плагинов и тем настоятельно рекомендуется использовать WP_DEBUG
 * в своём рабочем окружении.
 *
 * Информацию о других отладочных константах можно найти в Кодексе.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* Это всё, дальше не редактируем. Успехов! */

/** Абсолютный путь к директории WordPress. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Инициализирует переменные WordPress и подключает файлы. */
require_once( ABSPATH . 'wp-settings.php' );
