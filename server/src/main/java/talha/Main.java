package talha;

import static spark.Spark.*;

public class Main {

    public static void main(String[] args) {
        before((req, res) -> res.header("Access-Control-Allow-Origin", "*"));
        get("/", (req, res) -> "");
    }

}