<div class="page-header">
    <h1 class="title">Concierge Reservation</h1>
    <!-- Start Page Header Right Div -->
    <div class="left">
      <div class="btn-group" role="group" aria-label="...">
        <a href="#home" class="btn btn-light"><i class="fa fa-chevron-circle-left"> Back</i></a>
      </div>
    </div>
    <!-- End Page Header Right Div -->
  </div>

<div class="panel">
    <div class="panel-title"><%= location.name %> : <%= name %> <span class="label label-primary" style="font-size: 12px"> <%= begin_at %> </span> to <span class="label label-primary" style="font-size: 12px"> <%= end_at %></span></div>
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" height="100%"  viewBox="0 0 1280 1024" xml:space="preserve">
	   <image overflow="visible" width="1280" height="1024" xlink:href="<%= url %>image/bg.jpg"></image>
	</svg>
</div>

<div class="modal fade" id="reservation" tabindex="-1" role="dialog" aria-hidden="true" style="display: none;">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                    <h4 class="modal-title">Stand</h4>
                  </div>
                  <div class="modal-body">
                    <div class="panel panel-default">
                        <div class="panel-body status">
                            <div class="image"><img id="mod-image" src="#g" alt="img"></div>
                            <ul class="comments">
                            <li>
                                <span class="name">Location: </span> <p id="mod-location"><%= location.name %></p>
                                        
                              </li>
                              <li>
                                <span class="name">Size: </span> <p id="mod-size"></p>
                              </li>
                              
                              <li>
                                <span class="name">Price: </span> <p id="mod-price"></p>
                                        
                              </li>
                            </ul>
                          </div>
                        </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                    <a href="#" class="btn btn-default btn-reserve" id="btn-rsv">RESERVE</a>
                  </div>
                </div>
              </div>
            </div>
            