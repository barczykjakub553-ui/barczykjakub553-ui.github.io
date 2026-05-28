<?php
/** @var $post ?\App\Model\Post|\App\Model\PostCar */
?>
<div class="form-group">
    <label for="subject">Subject</label>
    <input type="text" id="subject" name="post[subject]" value="<?= $post ? htmlspecialchars($post->getSubject(), ENT_QUOTES, 'UTF-8') : '' ?>">
</div>

<div class="form-group">
    <label for="content">Content</label>
    <textarea id="content" name="post[content]"><?= $post ? htmlspecialchars($post->getContent(), ENT_QUOTES, 'UTF-8') : '' ?></textarea>
</div>

<div class="form-group">
    <label for="carModel">Car model</label>
    <input type="text" id="carModel" name="post[carModel]" value="<?= ($post && method_exists($post, 'getCarModel')) ? htmlspecialchars($post->getCarModel(), ENT_QUOTES, 'UTF-8') : '' ?>">
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>