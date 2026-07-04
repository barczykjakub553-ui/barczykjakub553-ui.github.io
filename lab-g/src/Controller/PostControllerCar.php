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
        $postsCarS = PostCar::findAll();
        return $templating->render('postCar/index.html.php', [
            'postsCarS' => $postsCarS,
            'router' => $router,
        ]);
    }

    public function createAction(?array $requestPost, Templating $templating, Router $router): ?string
    {
        if ($requestPost) {
            $postCar = PostCar::fromArray($requestPost);
            // @todo missing validation
            $postCar->save();

            $path = $router->generatePath('post-index');
            $router->redirect($path);
            return null;
        } else {
            $postCar = new PostCar();
        }

        return $templating->render('postCar/create.html.php', [
            'postCar' => $postCar,
            'router' => $router,
        ]);
    }

    public function editAction(int $postId, ?array $requestPost, Templating $templating, Router $router): ?string
    {
        $postCar = PostCar::find($postId);
        if (! $postCar) {
            throw new NotFoundException("Missing post with id $postId");
        }

        if ($requestPost) {
            $postCar->fill($requestPost);
            // @todo missing validation
            $postCar->save();

            $path = $router->generatePath('post-index');
            $router->redirect($path);
            return null;
        }

        return $templating->render('postCar/edit.html.php', [
            'postCar' => $postCar,
            'router' => $router,
        ]);
    }

    public function showAction(int $postId, Templating $templating, Router $router): ?string
    {
        $postCarS = PostCar::find($postId);
        if (! $postCarS) {
            throw new NotFoundException("Missing post with id $postId");
        }

        return $templating->render('postCar/show.html.php', [
            'postCar' => $postCarS,
            'router' => $router,
        ]);
    }

    public function deleteAction(int $postId, Router $router): ?string
    {
        $postCar = PostCar::find($postId);
        if (! $postCar) {
            throw new NotFoundException("Missing post with id $postId");
        }

        $postCar->delete();
        $path = $router->generatePath('post-index');
        $router->redirect($path);
        return null;
    }
}