package the.lidless.eye.js.servlet;

import java.io.IOException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import the.lidless.eye.js.JSResourceCustomizer;

public class JsServlet extends HttpServlet {

	private static final long serialVersionUID = 3350251897008520599L;

	//TODO
	public static final String JS_TEMPLATE_PATH = "/the/lidless/eye/tle_template.js";
	
	private byte[] jsContent;
	
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        String jsPropertiesPath = config.getInitParameter("jsPropertiesPath");
        
        JSResourceCustomizer jsResourceCustomizer = new JSResourceCustomizer(JS_TEMPLATE_PATH, jsPropertiesPath);
        try {
			jsContent = jsResourceCustomizer.getCustomizedJs().getBytes();
		} catch (IOException e) {
			throw new ServletException("Error during customizing js", e);
		}
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/javascript");
		response.getOutputStream().write(jsContent);
	}

}
