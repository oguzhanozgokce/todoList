<?php

$file_path = "todos.json";

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        echo file_get_contents($file_path);
        break;
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $todos = json_decode(file_get_contents($file_path), true);
        $todos[] = array("id" => uniqid(), "task" => $data["task"]);
        file_put_contents($file_path, json_encode($todos));
        echo json_encode(array("message" => "Yeni görev eklendi"));
        break;
    case 'DELETE':
        $id = $_GET['id'];
        $todos = json_decode(file_get_contents($file_path), true);
        foreach ($todos as $key => $todo) {
            if ($todo["id"] === $id) {
                unset($todos[$key]);
                break;
            }
        }
        file_put_contents($file_path, json_encode(array_values($todos)));
        echo json_encode(array("message" => "Görev silindi"));
        break;
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $_GET['id'];
        $todos = json_decode(file_get_contents($file_path), true);
        foreach ($todos as &$todo) {
            if ($todo["id"] === $id) {
                $todo["task"] = $data["task"];
                break;
            }
        }
        file_put_contents($file_path, json_encode($todos));
        echo json_encode(array("message" => "Görev güncellendi"));
        break;
    default:
        http_response_code(405);
        echo json_encode(array("message" => "Geçersiz istek"));
        break;
}
?>
