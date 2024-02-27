import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.ResourceHandler;

public class Main {
    public static void main(String[] args) throws Exception {
        Server server = new Server(8080);

        ResourceHandler resourceHandler = new ResourceHandler();
        resourceHandler.setDirectoriesListed(true);
        resourceHandler.setWelcomeFiles(new String[]{"index.html"});
        resourceHandler.setResourceBase(".");

        server.setHandler(resourceHandler);
        server.start();
        server.join();
    }
}
