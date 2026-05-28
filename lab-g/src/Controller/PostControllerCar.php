<?php
namespace App\Controller;

use App\Exception\NotFoundException;
use App\Model\PostCar;
use App\Service\Router;
use App\Service\Templating;

class PostControllerCar
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $posts = PostCar::findAll();
        return $templating->render('postCar/index.html.php', [
            'posts' => $posts,
            'router' => $router,
        ]);
    }

    public function createAction(?array $requestPost, Templating $templating, Router $router): ?string
    {
        if ($requestPost) {
            $post = PostCar::fromArray($requestPost);
            // @todo missing validation
            $post->save();

            $path = $router->generatePath('post-index');
            $router->redirect($path);
            return null;
        } else {
            $post = new PostCar();
        }

        return $templating->render('postCar/create.html.php', [
            'post' => $post,
            'router' => $router,
        ]);
    }

    public function editAction(int $postId, ?array $requestPost, Templating $templating, Router $router): ?string
    {
        $post = PostCar::find($postId);
        if (! $post) {
            throw new NotFoundException("Missing post with id $postId");
        }

        if ($requestPost) {
            $post->fill($requestPost);
            // @todo missing validation
            $post->save();

            $path = $router->generatePath('post-index');
            $router->redirect($path);
            return null;
        }

        return $templating->render('postCar/edit.html.php', [
            'post' => $post,
            'router' => $router,
        ]);
    }

    public function showAction(int $postId, Templating $templating, Router $router): ?string
    {
        $post = PostCar::find($postId);
        if (! $post) {
            throw new NotFoundException("Missing post with id $postId");
        }

        return $templating->render('postCar/show.html.php', [
            'post' => $post,
            'router' => $router,
        ]);
    }

    public function deleteAction(int $postId, Router $router): ?string
    {
        $post = PostCar::find($postId);
        if (! $post) {
            throw new NotFoundException("Missing post with id $postId");
        }

        $post->delete();
        $path = $router->generatePath('post-index');
        $router->redirect($path);
        return null;
    }
}