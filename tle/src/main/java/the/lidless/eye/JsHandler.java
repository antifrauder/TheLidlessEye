package the.lidless.eye;

import java.io.IOException;
import java.io.Reader;

public interface JsHandler {

	Reader handle(Reader in) throws IOException;

}
