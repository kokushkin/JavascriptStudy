using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class asphandler1 :  System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    { 
        var total = 0;
        Dictionary<string, int> respDic = new Dictionary<string, int>();
        foreach (var key in Request.Form.AllKeys)
        {
            var value = int.Parse(Request.Form[key]);
            if (value > 0)
            {
                total += value;
                respDic[key] = value;
            }
        }
        respDic["total"] = total;

        Response.ContentType = "application/json";
        Response.CacheControl = "no-cache";

        var serialiser = new JavaScriptSerializer();
        var json = serialiser.Serialize(respDic);

        Response.Clear();
        Response.Write(json);
        Response.Flush();
    }
}