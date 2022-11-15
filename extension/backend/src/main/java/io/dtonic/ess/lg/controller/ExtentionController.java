package io.dtonic.ess.lg.controller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExtentionController {

  @CrossOrigin(origins = "http://localhost:8080, http://localhost:9091")
  @GetMapping("/extensionsRoutes")
  public String remoteModulesRoutes() {
    // 아래의 형식으로 ESS > frontend router에 추가할 component의 정보를 기술하여 반환 해준다.
    JsonArray routes = new JsonArray();

    JsonObject route = new JsonObject();
    route.addProperty("path", "/extension");
    route.addProperty("name", "Extension");
    route.addProperty("container", "extensions");
    route.addProperty("component", "ExtensionPage");

    routes.add(route);

    Gson gson = new Gson();
    return gson.toJson(routes);
  }
}
