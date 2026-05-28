<?php
namespace App\Model;

use App\Service\Config;

class PostCar extends Post
{
    private ?string $carModel = null;

    public function getCarModel(): ?string
    {
        return $this->carModel;
    }

    public function setCarModel(?string $carModel): PostCar
    {
        $this->carModel = $carModel;
        return $this;
    }

    // Tworzymy instancję klasy potomnej (self)
    public static function fromArray($array): PostCar
    {
        $post = new self();
        $post->fill($array);
        return $post;
    }

    public function fill($array): PostCar
    {
        parent::fill($array);
        if (isset($array['carModel'])) {
            $this->setCarModel($array['carModel']);
        } elseif (isset($array['car_model'])) {
            $this->setCarModel($array['car_model']);
        }
        return $this;
    }

    // Własne findAll / find aby nie zależeć od implementacji Post::find* (jeśli nie możesz edytować Post.php)
    public static function findAll(): array
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM post';
        $statement = $pdo->prepare($sql);
        $statement->execute();

        $posts = [];
        $rows = $statement->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($rows as $row) {
            $posts[] = self::fromArray($row);
        }
        return $posts;
    }

    public static function find($id): ?PostCar
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM post WHERE id = :id';
        $statement = $pdo->prepare($sql);
        $statement->execute(['id' => $id]);

        $row = $statement->fetch(\PDO::FETCH_ASSOC);
        if (! $row) {
            return null;
        }
        return self::fromArray($row);
    }

    // Nadpisana metoda save() aby zapisywać też car_model (kolumna w DB)
    public function save(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));

        // używamy kolumny 'car_model' w bazie — jeżeli masz nazwę camelCase, zastąp 'car_model' na 'carModel'
        if (! $this->getId()) {
            $sql = "INSERT INTO post (subject, content, car_model) VALUES (:subject, :content, :car_model)";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                ':subject' => $this->getSubject(),
                ':content' => $this->getContent(),
                ':car_model' => $this->getCarModel(),
            ]);
            $this->setId($pdo->lastInsertId());
        } else {
            $sql = "UPDATE post SET subject = :subject, content = :content, car_model = :car_model WHERE id = :id";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                ':subject' => $this->getSubject(),
                ':content' => $this->getContent(),
                ':car_model' => $this->getCarModel(),
                ':id' => $this->getId(),
            ]);
        }
    }
}