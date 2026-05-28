<?php

/** @var \App\Model\Post|\App\Model\PostCar $post */
/** @var \App\Service\Router $router */

$title = "{$post->getSubject()} ({$post->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= htmlspecialchars($post->getSubject(), ENT_QUOTES, 'UTF-8') ?></h1>

    <h2 class="car-model"><?= htmlspecialchars($post->getCarModel(), ENT_QUOTES, 'UTF-8') ?></h2>

    <article>
        <?= nl2br(htmlspecialchars((string)$post->getContent(), ENT_QUOTES, 'UTF-8')) ?>
    </article>

    <ul class="action-list">
        <li><a href="<?= $router->generatePath('post-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('post-edit', ['id'=> $post->getId()]) ?>">Edit</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';